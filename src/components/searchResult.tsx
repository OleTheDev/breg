import React, { useState } from "react";
import Moment from "moment";
import Modal from "./modal";
import { SearchBrregResult } from "../api/brreg";

interface SearchDataProps {
  data: SearchBrregResult[];
}

export default function SearchResult(props: SearchDataProps) {
  const { data } = props;

  const [showInModal, setShowInModal] = useState<SearchBrregResult | null>(
    null
  );

  const visitWebsite = () => {
    if (!showInModal) return;

    const { hjemmeside } = showInModal;

    if (!hjemmeside) {
      alert("Mangler nettside!");
      return;
    }

    window.open(hjemmeside);
  };

  return (
    <>
      <Modal
        isOpen={!!showInModal}
        onClose={() => setShowInModal(null)}
        onAction={() => visitWebsite()}
        onActionText="Åpne Nettside"
        title={`Firma Informasjon for ${showInModal?.navn}`}
      >
        <div className="mt-5">
          {showInModal?.konkurs ? (
            <span className="font-semibold text-lg text-red-600">
              Firmaet er konkurs
            </span>
          ) : (
            <span className="font-semibold text-lg text-green-600">
              Firmaet er ikke konkurs
            </span>
          )}
        </div>
      </Modal>

      <div className="flex-wrap flex-col rounded overflow-hidden shadow-md">
        {data.map((x) => (
          <div
            key={x.organisasjonsnummer}
            className="focus:bg-gray-300 my-5 hover:bg-gray-300 cursor-pointer active:bg-gray-400"
            onClick={() => setShowInModal(x)}
          >
            <span className="font-medium">{x.navn}</span>
            <div className="text-sm font-normal text-gray-500 tracking-wide">
              Org.nr: {x.organisasjonsnummer}
            </div>

            {x.stiftelsesdato && (
              <div className="text-sm font-normal text-gray-500 tracking-wide">
                Stiftelsesdato: {Moment(x.stiftelsesdato).format("DD.MM.yyyy")}
              </div>
            )}
            <div className="text-sm font-normal text-gray-500 tracking-wide">
              {x.hjemmeside}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
