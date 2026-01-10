import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import "@/styles/pages/home.scss";

export default async function HomePage() {
  return (
    <div className="wrapper home-page">
      <section className="hero">
        <Image
          src="/images/hero.jpg"
          alt="Hero image"
          fill
          priority
          className="hero-bg"
        />

        <div className="hero-content">
          <h1>
            Dobrodošli u <span>svijet okusa</span>
          </h1>
          <p className="subtitle">
            Otkrijte recepte koji inspiriraju svaki dan.
          </p>
          <Link href="/recepti" className="hero-btn">
            Istražite recepte
            <ArrowRight size={22} />
          </Link>
        </div>
      </section>
    </div>
  );
}
