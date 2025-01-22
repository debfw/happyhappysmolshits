import Calculator from "./Calculator/page";
import MultiplicationTable from "./MultiplicationTable/page";
import Snake from "./Snake/page";
import Timer from "./Timer/page";
import TimeZone from "./TimeZone/page";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <MultiplicationTable />
      <Timer />
      <Calculator />
      <TimeZone />
      <Snake />
    </div>
  );
}
