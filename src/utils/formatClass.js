export default class DataFormatter {
  static formatStatesSelect(statesArray) {
    return statesArray.map((state) => ({
      value: state.name,
      label: state.name,
    }));
  }
  static formatFormData(formData) {
    return {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      dateOfBirth: formData.get("dateOfBirth"),
      startDate: formData.get("startDate"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
      department: formData.get("department"),
    };
  }
}
