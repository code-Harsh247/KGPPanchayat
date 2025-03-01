import CitizenFilter from "./filters/CitizenFilter";
import AgriFilter from "./filters/AgriFilter";
import AssetsFilter from "./filters/AssetsFilter";

const FilterSection = ({ name, handleApplyFilters }) => {
  const renderFilterComponent = () => {
    switch (name) {
      case "citizens":
        return <CitizenFilter onApply={handleApplyFilters} />;
      case "agri_records":
        return <AgriFilter onApply={handleApplyFilters} />;
      case "assets":
        return <AssetsFilter onApply={handleApplyFilters} />;
      default:
        return null; // Or a default filter component if needed
    }
  };

  return <>{renderFilterComponent()}</>;
};

export default FilterSection;
