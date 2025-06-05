#!/bin/bash

# Configuration
BUCKET_NAME="talmyra.com"
BUILD_DIR="out"
REGION="us-east-1"
AWS_PROFILE="nurona-content"
CLOUDFRONT_DISTRIBUTION_ID="E3G4BYRL8AC4ZZ"

# Build
echo "Building React application..."
npm run build

# Upload all files except index.html
echo "Uploading static files..."
aws s3 --profile $AWS_PROFILE --region $REGION sync $BUILD_DIR s3://$BUCKET_NAME \
    --delete \
    --exclude "index.html"

# Upload index.html separately
echo "Uploading index.html..."
if [ -f "$BUILD_DIR/index.html" ]; then
    aws --profile $AWS_PROFILE s3 cp $BUILD_DIR/index.html s3://$BUCKET_NAME/index.html \
        --cache-control "no-cache,no-store,must-revalidate"
else
    echo "Error: index.html not found in $BUILD_DIR"
    exit 1
fi

# Invalidate CloudFront cache
if [ ! -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "Invalidating CloudFront cache..."
    aws --profile $AWS_PROFILE cloudfront create-invalidation \
        --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
        --paths "/*"
    echo "CloudFront invalidation started"
else
    echo "⚠️  WARNING: CLOUDFRONT_DISTRIBUTION_ID not set!"
    echo "⚠️  Your changes may not be visible due to CloudFront caching"
    echo "⚠️  Please add your CloudFront Distribution ID to this script"
fi

echo "Deployment complete!"
