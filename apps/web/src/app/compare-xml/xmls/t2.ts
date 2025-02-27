export const xmlT2 = `<?xml version="1.0" encoding="UTF-8"?>
<rsm:HouseWaybill
  xmlns:rsm="iata:housewaybill:1"
  xmlns:ram="iata:datamodel:3"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns:ccts="urn:un:unece:uncefact:documentation:standard:CoreComponentsTechnicalSpecification:2"
  xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:8"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <rsm:MessageHeaderDocument>
    <ram:ID>PVGA0013561</ram:ID>
    <ram:Name>HouseWaybill</ram:Name>
    <ram:TypeCode>703</ram:TypeCode>
    <ram:IssueDateTime>2024-09-09T09:34:53-03:00</ram:IssueDateTime>
    <ram:PurposeCode>Creation</ram:PurposeCode>
    <ram:VersionID>3.00</ram:VersionID>
    <ram:SenderParty>
      <ram:PrimaryID schemeID="O">BM LOGISTICA INTERNACIONAL LTDA</ram:PrimaryID>
    </ram:SenderParty>
    <ram:RecipientParty>
      <ram:PrimaryID schemeID="O">RFB</ram:PrimaryID>
    </ram:RecipientParty>
  </rsm:MessageHeaderDocument>

  <rsm:BusinessHeaderDocument>
    <ram:ID>PVGA0013561</ram:ID>
    <ram:SignatoryConsignorAuthentication>
      <ram:Signatory>SHENZHEN XING FENG LIAN TRADING CO.</ram:Signatory>
    </ram:SignatoryConsignorAuthentication>
    <ram:SignatoryCarrierAuthentication>
      <ram:ActualDateTime>2024-09-06T00:00:00-03:00</ram:ActualDateTime>
      <ram:Signatory>AIR FRANCE</ram:Signatory>
    </ram:SignatoryCarrierAuthentication>
  </rsm:BusinessHeaderDocument>

  <rsm:MasterConsignment>
    <ram:IncludedTareGrossWeightMeasure unitCode="KGM">704</ram:IncludedTareGrossWeightMeasure>
    <ram:TotalPieceQuantity>39</ram:TotalPieceQuantity>
    <ram:TransportContractDocument>
      <ram:ID>05751329294</ram:ID>
    </ram:TransportContractDocument>
    <ram:OriginLocation>
      <ram:ID>PVG</ram:ID>
    </ram:OriginLocation>
    <ram:FinalDestinationLocation>
      <ram:ID>FOR</ram:ID>
    </ram:FinalDestinationLocation>

    <ram:IncludedHouseConsignment>
      <ram:ID>PVGA0013561</ram:ID>
      <ram:NilCarriageValueIndicator>true</ram:NilCarriageValueIndicator>
      <ram:NilCustomsValueIndicator>true</ram:NilCustomsValueIndicator>
      <ram:NilInsuranceValueIndicator>true</ram:NilInsuranceValueIndicator>
      <ram:TotalChargePrepaidIndicator>true</ram:TotalChargePrepaidIndicator>
      <ram:WeightTotalChargeAmount currencyID="USD">1408</ram:WeightTotalChargeAmount>
      <ram:ValuationTotalChargeAmount currencyID="USD">0</ram:ValuationTotalChargeAmount>
      <ram:TaxTotalChargeAmount currencyID="USD">0</ram:TaxTotalChargeAmount>
      <ram:TotalDisbursementPrepaidIndicator>true</ram:TotalDisbursementPrepaidIndicator>
      <ram:AgentTotalDisbursementAmount currencyID="USD">0</ram:AgentTotalDisbursementAmount>
      <ram:CarrierTotalDisbursementAmount currencyID="USD">0</ram:CarrierTotalDisbursementAmount>
      <ram:TotalPrepaidChargeAmount currencyID="USD">1408</ram:TotalPrepaidChargeAmount>
      <ram:TotalCollectChargeAmount currencyID="USD">0</ram:TotalCollectChargeAmount>
      <ram:IncludedTareGrossWeightMeasure unitCode="KGM">704</ram:IncludedTareGrossWeightMeasure>
      <ram:GrossVolumeMeasure unitCode="KGM">704</ram:GrossVolumeMeasure>
      <ram:DensityGroupCode>XXXXXXXXXX</ram:DensityGroupCode>
      <ram:ConsignmentItemQuantity>1</ram:ConsignmentItemQuantity>
      <ram:PackageQuantity>39</ram:PackageQuantity>
      <ram:TotalPieceQuantity>39</ram:TotalPieceQuantity>
      <ram:SummaryDescription>APLICADOR PORTATIL PARA COURO CABELUDO SUPORTE DE GARRAFA</ram:SummaryDescription>
      <ram:ConsignorParty>
        <ram:Name>SHENZHEN XING FENG LIAN TRADING CO., LTD</ram:Name>
        <ram:PostalStructuredAddress>
          <ram:StreetName>A1104, JIHAO BUILDING, NO.1086, SHENNAN EAST ROAD</ram:StreetName>
          <ram:CityName>SHENZHEN</ram:CityName>
          <ram:CountryID>CN</ram:CountryID>
        </ram:PostalStructuredAddress>
      </ram:ConsignorParty>
      <ram:ConsigneeParty>
        <ram:Name>XIAO XIAO COMERCIO DE VARIEDADES LTDA</ram:Name>
        <ram:PostalStructuredAddress>
          <ram:StreetName>RUA GENERAL SAMPAIO</ram:StreetName>
          <ram:CityName>FORTALEZA</ram:CityName>
          <ram:CountryID>BR</ram:CountryID>
        </ram:PostalStructuredAddress>
      </ram:ConsigneeParty>
      <ram:OriginLocation>
        <ram:ID>PVG</ram:ID>
        <ram:Name>PUDONG</ram:Name>
      </ram:OriginLocation>
      <ram:FinalDestinationLocation>
        <ram:ID>FOR</ram:ID>
        <ram:Name>FORTALEZA</ram:Name>
      </ram:FinalDestinationLocation>
      <ram:IncludedCustomsNote>
        <ram:ContentCode>T</ram:ContentCode>
        <ram:Content>CNPJ19221941000183</ram:Content>
        <ram:SubjectCode>CNE</ram:SubjectCode>
        <ram:CountryID>BR</ram:CountryID>
      </ram:IncludedCustomsNote>


      <ram:IncludedHouseConsignmentItem>
        <ram:SequenceNumeric>1</ram:SequenceNumeric>
        <ram:GrossWeightMeasure unitCode="KGM">704</ram:GrossWeightMeasure>
        <ram:PieceQuantity>39</ram:PieceQuantity>
        <ram:Information>NDA</ram:Information>
        <ram:NatureIdentificationTransportCargo>
          <ram:Identification>APLICADOR PORTATIL PARA COURO CABELUDO SUPORTE DE GARRAFA</ram:Identification>
        </ram:NatureIdentificationTransportCargo>
        <ram:ApplicableFreightRateServiceCharge>
          <ram:ChargeableWeightMeasure unitCode="KGM">704</ram:ChargeableWeightMeasure>
        </ram:ApplicableFreightRateServiceCharge>

      </ram:IncludedHouseConsignmentItem>
    </ram:IncludedHouseConsignment>
  </rsm:MasterConsignment>
</rsm:HouseWaybill>`;
