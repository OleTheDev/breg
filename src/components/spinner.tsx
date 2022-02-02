import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

interface Props {
  loading?: boolean;
}

export const Spinner: FC<Props> = ({ loading, children }) => {
  return (
    <div className="m-10">
      {loading ? (
        <div className="justify-center items-center text-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className="animate-spin text-center text-3xl my-5 text-blue-700"
          />
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};
