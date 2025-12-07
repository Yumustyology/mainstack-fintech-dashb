import React from "react";
import { Button } from "@/components/ui/button";
import { NoResultsIcon } from "@/components/atoms/icons";

type Props = {
  title?: string;
  message?: string;
  buttonLabel?: string;
  onClear?: () => void;
};

const NoResults: React.FC<Props> = ({
  title = "No matching transaction found",
  message = "Change your filters to see more results, or add a new product.",
  buttonLabel = "Clear Filter",
  onClear,
}) => {
  return (
    <div className="min-h-[260px] font-degular m-auto max-w-[369px] flex flex-col gap-6 justify-center items-start p-6">
      <div className="rounded-2xl bg-ms-gray-50 p-3 h-12 w-12 inline-flex items-center justify-center mb-5">
        <NoResultsIcon size={24} />
      </div>

      <div className="max-w-lg">
        <h3 className="text-2xl font-bold text-ms-black-300 mb-2.5">{title}</h3>
        <p className="text-base text-ms-gray-400 mb-9 font-medium">{message}</p>
        <div>
          <Button
            variant="ghost"
            className="rounded-full font-semibold text-base shadow-none h-12 text-ms-black-300 w-[117px] bg-ms-gray-50"
            onClick={onClear}
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoResults;
