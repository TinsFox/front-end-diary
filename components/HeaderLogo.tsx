import Link from "next/link";

function HeaderLogo() {
  return (
    <>
      <Link href="/" title="Home" className="hover:opacity-75">
        Front End Diary
      </Link>
    </>
  );
}

export default HeaderLogo;
