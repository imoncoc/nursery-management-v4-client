import {
  TAdditionalInformation,
  TCareInformation,
  TPhysicalCharacteristics,
} from "../Product.interface";

const TabItems = (
  additionalInformation: TAdditionalInformation,
  careInformation: TCareInformation,
  physicalCharacteristics: TPhysicalCharacteristics
) => [
  {
    label: "Additional Information",
    key: "1",
    children: (
      <div className="w-full md:w-[80%] lg:w-[80%]">
        <div className="p-4 bg-white rounded-lg">
          <div className="flex gap-4 mb-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">Origin:</p>
            <p className="text-gray-500">{additionalInformation.origin}</p>
          </div>
          <div className="flex gap-4 mb-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">Hardness:</p>
            <p className="text-gray-500">{additionalInformation.hardiness}</p>
          </div>
          <div className="flex gap-4 mb-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">Seasonality:</p>
            <p className="text-gray-500">{additionalInformation.seasonality}</p>
          </div>
          <div className="flex gap-4 mb-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">Toxicity:</p>
            <p className="text-gray-500">{additionalInformation.toxicity}</p>
          </div>
          <div className="flex gap-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">Uses:</p>
            <p className="text-gray-500">{additionalInformation.uses}</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "Care Information",
    key: "2",
    children: (
      <div className="w-full md:w-[80%] lg:w-[80%]">
        <div className="p-4 bg-white rounded-lg">
          <div className="flex gap-4 mb-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">Fertilization:</p>
            <p className="text-gray-500">{careInformation.fertilization}</p>
          </div>
          <div className="flex gap-4 mb-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">
              Pests and Diseases:
            </p>
            <p className="text-gray-500">{careInformation.pestsAndDiseases}</p>
          </div>
          <div className="flex gap-4 mb-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">Pruning:</p>
            <p className="text-gray-500">{careInformation.pruning}</p>
          </div>
          <div className="flex gap-4 mb-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">Soil Type:</p>
            <p className="text-gray-500">{careInformation.soilType}</p>
          </div>
          <div className="flex gap-4 mb-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">
              Sunlight Requirements:
            </p>
            <p className="text-gray-500">
              {careInformation.sunlightRequirements}
            </p>
          </div>
          <div className="flex gap-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">
              Watering Requirements:
            </p>
            <p className="text-gray-500">
              {careInformation.wateringRequirements}
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "Physical Characteristics",
    key: "3",
    children: (
      <div className="w-full md:w-[80%] lg:w-[80%]">
        <div className="p-4 bg-white rounded-lg">
          <div className="flex gap-4 mb-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">Growth Rate:</p>
            <p className="text-gray-500">
              {physicalCharacteristics.growthRate}
            </p>
          </div>
          <div className="flex gap-4 mb-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">Height:</p>
            <p className="text-gray-500">{physicalCharacteristics.height}</p>
          </div>
          <div className="flex gap-4 mb-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">Mature Height:</p>
            <p className="text-gray-500">
              {physicalCharacteristics.matureHeight}
            </p>
          </div>
          <div className="flex gap-4 mb-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">Mature Spread:</p>
            <p className="text-gray-500">
              {physicalCharacteristics.matureSpread}
            </p>
          </div>
          <div className="flex gap-4 mb-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">Planting Zone:</p>
            <p className="text-gray-500">
              {physicalCharacteristics.plantingZone}
            </p>
          </div>
          <div className="flex gap-4 pb-2 border-b border-lime-400">
            <p className="w-1/4 text-gray-400 font-semibold">Spread:</p>
            <p className="text-gray-500">{physicalCharacteristics.spread}</p>
          </div>
        </div>
      </div>
    ),
  },
];

export default TabItems;
