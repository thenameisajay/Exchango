import CurrencyComponent from "@/components/currency-component/currency-component";
import Footer from "@/components/footer/Footer";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <CurrencyComponent />
            <Footer />
        </main>
    );
}
