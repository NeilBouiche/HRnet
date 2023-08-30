// formating class
export default class DataFormatter {
  // format the list that is used in the states select field
  static formatStatesSelect(statesArray) {
    return statesArray.map((state) => ({
      value: state.name,
      label: state.name,
    }));
  }
  // format the form data so that we can get all data independently and assign it to a single object
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
