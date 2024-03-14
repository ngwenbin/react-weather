import { Button } from "@/components/common";
import { WeatherData } from "../utils/parseWeatherData";
import {} from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

interface WeatherSearchRecordProps {
  data: WeatherData[];
  handleOnSearch: (record: WeatherData) => void;
  handleOnDelete: (id: string) => void;
}

export const WeatherSearchRecord = ({
  data,
  handleOnSearch,
  handleOnDelete,
}: WeatherSearchRecordProps) => {
  const isEmpty = data.length === 0;

  if (isEmpty) {
    return <div>No records.</div>;
  }
  return (
    <div className="flex flex-col">
      {data.map((record, idx) => {
        const { time, city, countryCode, id } = record;
        const date = new Date(time);

        return (
          <div
            key={id}
            className="py-1 flex justify-between border-b border-gray-300 items-center"
          >
            <div>
              <span className="pr-2">{idx + 1}.</span>
              {[city, countryCode].join(", ")}
            </div>
            <div className="flex items-center">
              <div className="pr-4">{date.toLocaleString()}</div>
              <Button onClick={() => handleOnSearch(record)}>
                <MagnifyingGlassCircleIcon width={24} height={24} />
              </Button>
              <Button onClick={() => handleOnDelete(id)}>
                <TrashIcon width={24} height={24} />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
