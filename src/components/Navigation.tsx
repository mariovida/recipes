import Image from "next/image";
import Link from "next/link";
import "@/styles/components/navigation.scss";

export default function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="logo">
          <Image src="/logo.svg" alt="Logo" width={160} height={40} priority />
        </Link>
        <div className="nav-links">
          <Link href="/" className="lead">
            Dodajte recept
          </Link>
        </div>
      </div>
    </nav>
  );
}
