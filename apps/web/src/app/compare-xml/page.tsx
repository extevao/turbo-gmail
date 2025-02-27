"use client";
//compare-xml
import DiffViewer from "react-diff-viewer";

import convert from "xml-js";
import { xmlT2 } from "./xmls/t2";
import { xmlT1 } from "./xmls/t1";

const xmlToJson = (xmlString: string) =>
  convert.xml2json(xmlString, { compact: true, spaces: 2 });

const diff = (xml1: string, xml2: string) => {
  const json1 = xmlToJson(xml1);
  const json2 = xmlToJson(xml2);

  console.log({ json1, json2 });

  // Agora você pode comparar os dois JSONs como objetos JavaScript
  return json1 !== json2 ? "Different XMLs" : "Identical XMLs";
};

export default function Home() {
  console.log({ xmlT1, xmlT2 });

  console.log(diff(xmlT1, xmlT2));

  return (
    <div>
      <XMLDiff oldXML={xmlT1} newXML={xmlT2} />
    </div>
  );
}

const XMLDiff = ({ oldXML, newXML }: any) => {
  return <DiffViewer oldValue={oldXML} newValue={newXML} splitView={true} />;
};
