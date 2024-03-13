import { Button, Input } from "@/components/common";

export const HomePage = () => {
  const handleOnSelect = () => {};
  const handleOnDelete = () => {};

  return (
    <div>
      <h1 className="text-2xl p-4">Weather App</h1>
      <div className="flex">
        <Input
          id="city"
          label="City:"
          labelClassName="mr-2"
          containerClassName="mr-4"
        />
        <Input
          id="country"
          label="Country:"
          labelClassName="mr-2"
          containerClassName="mr-4"
        />
        <Button id="search">Search</Button>
        <Button id="clear">Clear</Button>
      </div>
    </div>
  );
};
