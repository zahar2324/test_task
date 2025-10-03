const Skeleton = () => (
  <ul className="grid gap-4 md:grid-cols-2">
    {[...Array(8)].map((_, i) => (
      <li
        key={i}
        className="bg-purple-200 animate-pulse rounded-lg h-32 w-full border border-purple-300"
      />
    ))}
  </ul>
);
export default Skeleton;