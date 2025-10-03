import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <Image 
      src={process.env.NEXT_PUBLIC_IMAGE_PATH + "newyourk.jpg"}
      alt="Example Image" 
      width={500} 
      height={300} 
    />
    <h1>Hello, Next.js!</h1>
    <p>This is a simple Next.js application.</p>
  
    </>
  );
}
