import React, { useState } from "react";
import Moment from "moment";
import Modal from "./modal";

interface ISearchResult {
  navn: string;
  organisasjonsnummer: string;
  registreringsdatoEnhetsregisteret: string;
  hjemmeside: string;
  stiftelsesdato: string;
  konkurs: boolean;
}

interface SearchDataProps {
  data: Array<ISearchResult>;
}

export default function SearchResult(props: SearchDataProps) {
  const { data } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Disse egenskapene konkurrerer ved første øyekast mot idéen om å bare ha én useState for valg firma å vise i modalen.
  const [firmaNettside, setFirmaNettside] = useState<string>("");
  const [isKonkurs, setIsKonkurs] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");

  const visitWebsite = () => {
    if (!firmaNettside) {
      alert("Mangler nettside!");
      return;
    }
    if (!firmaNettside.includes("http")) {
      window.open(`https://${firmaNettside}`);
    } else {
      window.open(firmaNettside);
    }
  };

  const OpenModal = (orgnr: string) => {
    /**
     * Bruk av map her forteller feil historie. Når jeg ser map tenker jeg at vi skal ta array-et,
     * gjøre noe med hver verdi og returnere et nytt array. Det gjør vi ikke her. En forEach, eller kanskje en find
     * kunne passet bedre.
     *
     * Jeg legger også merke til at koden under som kaller på denne "OpenModal(x.organisasjonsnummer)" alt besitter x, hvor x er
     * et ISearchResult som vi i koden under søker etter.
     */
    data.map((x: ISearchResult) => {
      if (x.organisasjonsnummer === orgnr) {
        setFirmaNettside(x.hjemmeside);
        setIsKonkurs(x.konkurs);
        setModalTitle(`Firma Informasjon for ${x.navn}`);
        setIsModalOpen(true);
        return;
      }
    });
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        onAction={() => visitWebsite()}
        onActionText="Åpne Nettside"
        title={modalTitle}
      >
        <div className="mt-5">
          {isKonkurs ? (
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
        {data.map((x: ISearchResult) => (
          <div
            key={x.organisasjonsnummer}
            className="focus:bg-gray-300 my-5 hover:bg-gray-300 cursor-pointer active:bg-gray-400"
            onClick={() => OpenModal(x.organisasjonsnummer)}
          >
            <span className="font-medium">{x.navn}</span>
            <div className="text-sm font-normal text-gray-500 tracking-wide">
              Org.nr: {x.organisasjonsnummer}
            </div>

            {x.stiftelsesdato != "" && (
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
