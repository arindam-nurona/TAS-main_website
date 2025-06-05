#!/bin/bash

# Configuration
BUCKET_NAME="hvbpbsbj.nurona.co"
BUILD_DIR="out"
REGION="us-east-1"
AWS_PROFILE="nurona-content"

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

echo "Deployment complete!"
