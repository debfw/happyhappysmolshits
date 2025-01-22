const MultiplicationTable = () => {
  // Generate results
  const result: string[][] = [];

  const multiplier = () => {
    for (let i = 1; i < 10; i++) {
      const column: string[] = [];
      for (let j = 1; j < 10; j++) {
        column.push(`${i} x ${j} = ${i * j}`);
      }
      result.push(column);
    }
    return result;
  };

  multiplier();

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        {result.map((set, setIndex) => (
          <div
            key={setIndex}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {set.map((item, itemIndex) => (
              <span key={itemIndex}>{item}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiplicationTable;
