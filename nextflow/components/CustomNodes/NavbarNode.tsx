export default function NavbarNode() {
  return (
    <div className="flex justify-between bg-black text-white p-3 rounded">
      <span>Logo</span>
      <div className="flex gap-3">
        <span>Home</span>
        <span>About</span>
        <span>Contact</span>
      </div>
    </div>
  );
}