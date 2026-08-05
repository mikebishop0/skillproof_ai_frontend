import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './publicLayout.css';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="public-layout-page spai-landing">
      <Navbar />

      <main className="public-layout-content">
        <div className="wrap">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
