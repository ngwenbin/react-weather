import { Button, Input } from "@/components/common";
import {
  ArrowUpRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { FormEvent, useEffect } from "react";
import { WeatherData } from "../utils/parseWeatherData";
import clsx from "clsx";

interface FancySearchProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onHistoryClick: (data: WeatherData) => void;
  history: WeatherData[];
}

export const FancySearch = ({
  onSubmit,
  history,
  show,
  onClose,
  onHistoryClick,
}: FancySearchProps) => {
  useEffect(() => {
    const closeOnEscapePressed = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", closeOnEscapePressed);
    return () => window.removeEventListener("keydown", closeOnEscapePressed);
  }, []);

  if (!show) return null;
  return (
    <>
      <form
        className={clsx(
          "flex absolute z-10 bg-white w-full flex-col items-center px-4"
        )}
        onSubmit={onSubmit}
      >
        <div className="w-full max-w-3xl">
          <div className="flex items-center pb-4">
            <MagnifyingGlassIcon className="w-6 h-6 text-[#6E6E73] mr-2" />
            <Input
              autoFocus
              id="city"
              name="city"
              className="w-full min-w-0 truncate border-0 outline-none !text-2xl !p-0 font-medium placeholder:!text-[#6E6E73] text-[#333336]"
              containerClassName="flex items-center grow justify-between m-1"
              placeholder="Search a city or country"
            />
          </div>
          <div className={clsx("bg-white w-full text-xs pt-4 pb-12")}>
            <div className="text-[#6E6E73] mb-2">Previous Search</div>
            <div>
              {history.slice(0, 5).map((data) => (
                <Button
                  key={data.id}
                  variant="secondary"
                  className="text-[#333336] font-medium !text-xs !px-0 hover:text-purple-400"
                  onClick={() => onHistoryClick(data)}
                >
                  {data.city}
                  <ArrowUpRightIcon width={14} height={14} className="ml-1" />
                </Button>
              ))}
            </div>
          </div>
        </div>
        <button type="submit" hidden />
      </form>
      <div
        className={
          "fixed w-screen h-[calc(100vh_-_92px)] left-0 bg-gray-200/70 backdrop-blur-sm"
        }
        onClick={onClose}
      />
    </>
  );
};
