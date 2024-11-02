import { Card } from "@/components/ui/card";

export default function Stats() {
    return (
      <>
        <h1 className="text-2xl font-semibold">Stats</h1>
        <p className="text-gray-500">Welcome to the stats page.</p>
        <Card>
    <a href="#">
      <div className="font-bold text-lg">Quick start</div>
      <div className="text-gray-500 text-sm">
        Start building your next project in minutes
      </div>
    </a>
  </Card>
      </>
    );
  }