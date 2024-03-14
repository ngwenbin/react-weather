import { HomePage } from "@/components/pages/home";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`min-h-screen ${inter.className} px-4`}>
      <HomePage />
    </main>
  );
}
