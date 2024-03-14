import { Button } from "@/components/common";
import { WeatherData } from "../utils/parseWeatherData";
import { ArrowUpRightIcon, TrashIcon } from "@heroicons/react/24/outline";

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
            className="px-4 py-2 flex justify-between border-b border-gray-200 items-center"
          >
            <div className="flex grow min-w-0">
              <div className="mr-2">{idx + 1}.</div>
              <div className="flex justify-between grow flex-wrap min-w-0">
                <div>{[city, countryCode].join(", ")}</div>
                <div className="pr-4 min-w-0 truncate">
                  {date.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <Button
                onClick={() => handleOnSearch(record)}
                variant="secondary"
                className="!p-0 mr-2 hover:text-purple-400"
              >
                <ArrowUpRightIcon width={16} height={16} />
              </Button>
              <Button
                onClick={() => handleOnDelete(id)}
                variant="secondary"
                className="!p-0 text-red-400 hover:text-red-600"
              >
                <TrashIcon width={16} height={16} />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
