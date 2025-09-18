import Webinar from '@/components/webinar';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function WebinarPage() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<Navbar />
			<Webinar />
			<Footer />
		</div>
	);
}
