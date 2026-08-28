function StatsBar({ technologyCount }) {
  const stats = [
    {
      value: technologyCount,
      label: "Technologies",
    },
    {
      value: "Graph",
      label: "Data model",
    },
    {
      value: "CognoDB",
      label: "Powered by",
    },
  ];

  return (
    <section className="stats-bar">
      {stats.map((stat) => (
        <div className="stat" key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </section>
  );
}

export default StatsBar;
