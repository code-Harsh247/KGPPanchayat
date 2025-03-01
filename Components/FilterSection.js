import CitizenFilter from "./filters/CitizenFilter";
import AgriFilter from "./filters/AgriFilter";
import AssetsFilter from "./filters/AssetsFilter";
import GovtMonitorFilter from "./filters/GovtMonitorFilter";
import HouseholdInfoFilter from "./filters/HouseholdInfoFilter";
import LandRecordsFilter from "./filters/LandRecordsFilter";
import PanchayatEmployeesFilter from "./filters/PanchayatEmployeesFilter";
import SchemeBeneficiariesFilter from "./filters/SchemeBeneficiariesFilter";
import WelfareSchemesFilter from "./filters/WelfareSchemesFilter";


const FilterSection = ({ name, handleApplyFilters }) => {
  const renderFilterComponent = () => {
    switch (name) {
      case "citizens":
        return <CitizenFilter onApply={handleApplyFilters} />;
      case "agri_records":
        return <AgriFilter onApply={handleApplyFilters} />;
      case "assets":
        return <AssetsFilter onApply={handleApplyFilters} />;
      case "govtmonitors":
        return <GovtMonitorFilter onApply={handleApplyFilters} />;
      case "households":
        return <HouseholdInfoFilter onApply={handleApplyFilters} />;
      case "land_records":
        return <LandRecordsFilter onApply={handleApplyFilters} />;
      case "panchayat_employees":
        return <PanchayatEmployeesFilter onApply={handleApplyFilters}/>;
      case "scheme_beneficiaries":
        return <SchemeBeneficiariesFilter onApply={handleApplyFilters}/>;
      case "welfare_schemes":
        return <WelfareSchemesFilter onApply={handleApplyFilters} />;
      default:
        return null; // Or a default filter component if needed
    }
  };

  return <>{renderFilterComponent()}</>;
};

export default FilterSection;
