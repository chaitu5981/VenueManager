import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Typo from "./Typo";
import { capitalize, formatDate } from "../utils/helper";
import { useState } from "react";
import {
  accommodationTypes,
  bookingTypes,
  colors,
  diningMenu,
  eventTypes,
  venueTypes,
} from "../data/constants";
import { HelperText, RadioButton } from "react-native-paper";
import CustomSelect from "./CustomSelect";
import CustomTextInput from "./CustomTextInput";
import CustomButton from "./CustomButton";
import TimePicker from "./TimePicker";
import RoomsForm from "./RoomsForm";
import PersonsForm from "./PersonsForm";
import ServicesForm from "./ServicesForm";
import { useAddEnquiryContext } from "../app/add-enquiry/_layout";
import { useRouter } from "expo-router";

const emptyDining = {
  menu: "",
  noOfPlates: 0,
  costPerPlate: 0,
  totalDiningCost: 0,
};
const emptyAccommodation = {
  type: "",
  rooms: {
    noOfRooms: 0,
    list: [],
  },
  persons: {
    noOfPersons: 0,
    costPerPerson: 0,
    totalPersonsCost: 0,
    list: [],
  },
};
const emptyErrors = {
  subEventType: "",
  subVenue: "",
  bookingType: "",
  noOfGuests: "",
  checkInTime: "",
  checkOutTime: "",
  rent: "",
  noOfPlates: "",
  costPerPlate: "",
  noOfRooms: "",
  rooms: [],
  noOfPersons: "",
  personCost: "",
  persons: [],
  services: [],
};
const emptyEvent = (eventDate) => ({
  eventType: "traditional",
  subEventType: "",
  subVenue: "",
  bookingType: "",
  noOfGuests: 0,
  eventDate,
  checkInTime: "",
  checkOutTime: "",
  rent: 0,
});
const EventForm = () => {
  const { enquiry, setEnquiry, eventDates } = useAddEnquiryContext();

  const [eventNo, setEventNo] = useState(1);
  const [event, setEvent] = useState(() => emptyEvent(eventDates[0]));
  const [dining, setDining] = useState(emptyDining);
  const [accommodation, setAccommodation] = useState(emptyAccommodation);
  const [services, setServices] = useState([]);
  const [errors, setErrors] = useState({ ...emptyErrors });
  const router = useRouter();
  const eventDatesData = eventDates.map((date) => ({
    value: date,
    label: formatDate(date),
  }));
  const getSubEventTypes = () => {
    const selectedEventType = eventTypes.find(
      (e) => e.value == event.eventType
    );
    return selectedEventType.subEventTypes;
  };
  const handleSelectAccommodation = (v) => {
    if (v == "perRoom") {
      setAccommodation({
        ...accommodation,
        type: v,
        rooms: {
          noOfRooms: 1,
          list: [{ roomNo: "", roomCost: 0 }],
        },
        persons: {
          noOfPersons: 0,
          list: [],
        },
      });
      setErrors({
        ...errors,
        rooms: [{ roomNo: "", roomCost: "" }],
        persons: [],
      });
    } else {
      setAccommodation({
        ...accommodation,
        type: v,
        rooms: {
          noOfRooms: 0,
          list: [],
        },
        persons: {
          noOfPersons: 1,
          personCost: 0,
          list: [{ name: "", contactNo: "" }],
        },
      });
      setErrors({
        ...errors,
        persons: [{ name: "", contactNo: "" }],
        rooms: [],
      });
    }
  };

  const validateForm = () => {
    const newErrors = { ...emptyErrors };
    const {
      subEventType,
      subVenue,
      bookingType,
      noOfGuests,
      checkInTime,
      checkOutTime,
      rent,
    } = event;
    let isValid = true;
    if (!subEventType) {
      newErrors.subEventType = "Select Sub Event Type";
      isValid = false;
    }
    if (!subVenue) {
      newErrors.subVenue = "Select Sub Venue";
      isValid = false;
    }
    if (!bookingType) {
      newErrors.bookingType = "Select Booking Type";
      isValid = false;
    }
    if (isNaN(noOfGuests) || noOfGuests <= 0) {
      newErrors.noOfGuests = "Enter valid number";
      isValid = false;
    }
    if (!checkInTime) {
      newErrors.checkInTime = "Enter Check In Time";
      isValid = false;
    }
    if (!checkOutTime) {
      newErrors.checkOutTime = "Enter Check Out Time";
      isValid = false;
    }
    if (isNaN(rent) || rent <= 0) {
      newErrors.rent = "Enter valid Rent Charge";
      isValid = false;
    }
    if (dining.menu) {
      if (isNaN(dining.noOfPlates) || dining.noOfPlates <= 0) {
        newErrors.noOfPlates = "Enter valid No Of Plates";
        isValid = false;
      }
      if (isNaN(dining.costPerPlate) || dining.costPerPlate <= 0) {
        newErrors.costPerPlate = "Enter valid Cost per Plate";
        isValid = false;
      }
    }
    if (accommodation.type == "perRoom") {
      if (
        isNaN(accommodation.rooms.noOfRooms) ||
        accommodation.rooms.noOfRooms <= 0
      ) {
        newErrors.noOfRooms = "Enter valid No of Rooms";
        isValid = false;
      }
      newErrors.rooms = accommodation.rooms.list.map((room, i) => {
        let roomError = { roomNo: "", roomCost: "" };
        if (!room.roomNo) {
          roomError.roomNo = "Enter valid Room No";
          isValid = false;
        }
        if (isNaN(room.roomCost) || room.roomCost <= 0) {
          roomError.roomCost = "Enter valid Room Cost";
          isValid = false;
        }
        return roomError;
      });
    }
    if (accommodation.type === "perPerson") {
      if (
        isNaN(accommodation.persons.noOfPersons) ||
        accommodation.persons.noOfPersons <= 0
      ) {
        newErrors.noOfPersons = "Enter valid No of Persons";
        isValid = false;
      }
      if (
        isNaN(accommodation.persons.personCost) ||
        accommodation.persons.personCost <= 0
      ) {
        newErrors.personCost = "Enter valid Cost per Person";
        isValid = false;
      }
      newErrors.persons = accommodation.persons.list.map((person, i) => {
        let personError = { name: "", contactNo: "" };
        if (!person.name.trim()) {
          personError.name = "Enter valid Name";
          isValid = false;
        }
        if (!person.contactNo.trim() || person.contactNo.length !== 10) {
          personError.contactNo = "Enter valid Contact No";
          isValid = false;
        }
        return personError;
      });
    }
    if (services.length > 0) {
      newErrors.services = services.map((service, i) => {
        let serviceError = { name: "", serviceCost: "" };
        if (!service.name.trim()) {
          serviceError.name = "Enter valid Service Name";
          isValid = false;
        }
        if (isNaN(service.serviceCost) || service.serviceCost <= 0) {
          serviceError.serviceCost = "Enter valid Service Cost";
          isValid = false;
        }
        return serviceError;
      });
    }
    setErrors(newErrors);

    return isValid;
  };

  const saveEvent = () => {
    if (validateForm()) {
      setEnquiry({
        ...enquiry,
        events: [
          ...enquiry.events,
          {
            ...event,
            dining: dining.menu && dining,
            accommodation: accommodation.type && {
              ...accommodation,
              rooms: accommodation.rooms.noOfRooms > 0 && accommodation.rooms,
              persons:
                accommodation.persons.noOfPersons > 0 && accommodation.persons,
            },
            services: services.length > 0 && services,
          },
        ],
      });
      return true;
    }
    return false;
  };

  const goToNextEvent = () => {
    if (saveEvent()) {
      setEvent(emptyEvent);
      setDining(emptyDining);
      setAccommodation(emptyAccommodation);
      setServices([]);
      setEventNo(eventNo + 1);
    }
  };
  const handleSubmit = () => {
    if (saveEvent()) router.replace("enquiry-details");
  };
  return (
    <View style={{ marginVertical: 20, gap: 15 }}>
      <Typo size={20}>Enter Event {eventNo} Details :</Typo>
      <CustomSelect
        options={eventDatesData}
        label="Event Date"
        value={event.eventDate}
        onSelect={(v) => setEvent({ ...event, eventDate: v })}
      />
      <View style={styles.eventType}>
        <Typo size={20}>Select Event Type :</Typo>
        <RadioButton.Group
          value={event.eventType}
          onValueChange={(v) =>
            setEvent({ ...event, eventType: v, subEventType: "" })
          }
        >
          <View style={{ gap: 10 }}>
            {eventTypes.map((eType) => (
              <View
                key={eType.value}
                style={{
                  backgroundColor:
                    event.eventType == eType.value ? "#FFFAF4" : "#F7F7F7",
                }}
              >
                <View style={styles.radio}>
                  <RadioButton value={eType.value} />
                  <TouchableOpacity
                    onPress={() =>
                      setEvent({
                        ...event,
                        eventType: eType.value,
                        subEventType: "",
                      })
                    }
                  >
                    <Typo>{eType.label}</Typo>
                  </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: 25, paddingBottom: 15 }}>
                  {event.eventType === eType.value &&
                    (event.eventType !== "others" ? (
                      <CustomSelect
                        options={getSubEventTypes()}
                        value={event.subEventType}
                        onSelect={(v) =>
                          setEvent({ ...event, subEventType: v })
                        }
                        label={`Select ${capitalize(eType.value)} Event`}
                      />
                    ) : (
                      <CustomTextInput
                        label={"Enter Event Type"}
                        value={event.subEventType}
                        onChange={(v) =>
                          setEvent({ ...event, subEventType: v })
                        }
                      />
                    ))}
                </View>
              </View>
            ))}
          </View>
        </RadioButton.Group>
        {errors.subEventType && (
          <HelperText type="error" visible={!!errors.subEventType}>
            {errors.subEventType}
          </HelperText>
        )}
      </View>
      <CustomSelect
        label="Sub Venue Type"
        options={venueTypes}
        value={event.subVenue}
        onSelect={(v) => setEvent({ ...event, subVenue: v })}
        error={errors.subVenue}
      />
      <CustomSelect
        label="BookingType"
        options={bookingTypes}
        value={event.bookingType}
        onSelect={(v) => setEvent({ ...event, bookingType: v })}
        error={errors.bookingType}
      />
      <CustomTextInput
        label={"No of Guests"}
        value={event.noOfGuests.toString()}
        onChange={(v) => setEvent({ ...event, noOfGuests: Number(v) })}
        error={errors.noOfGuests}
      />
      <TimePicker
        label={"Check In Time"}
        value={event.checkInTime}
        onConfirm={(v) => setEvent({ ...event, checkInTime: v })}
        error={errors.checkInTime}
      />
      <TimePicker
        label={"Check Out Time"}
        value={event.checkOutTime}
        onConfirm={(v) => setEvent({ ...event, checkOutTime: v })}
        error={errors.checkOutTime}
      />
      <CustomTextInput
        label={"Rent Charges"}
        value={event.rent.toString()}
        onChange={(v) => setEvent({ ...event, rent: Number(v) })}
        error={errors.rent}
      />
      <View style={styles.optional}>
        <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
          <RadioButton status="checked" />
          <Typo>Dining (optional)</Typo>
        </View>
        <CustomSelect
          options={diningMenu}
          label={"Select Menu"}
          value={dining.menu}
          onSelect={(v) => setDining({ ...dining, menu: v })}
        />
        <CustomTextInput
          label={"No Of Plates"}
          value={dining.noOfPlates.toString()}
          onChange={(v) => setDining({ ...dining, noOfPlates: Number(v) })}
          error={errors.noOfPlates}
        />
        <CustomTextInput
          label={"Cost per Plate"}
          value={dining.costPerPlate.toString()}
          onChange={(v) => setDining({ ...dining, costPerPlate: Number(v) })}
          error={errors.costPerPlate}
        />
        <CustomTextInput
          label={"Total Menu Cost"}
          value={(dining.costPerPlate * dining.noOfPlates).toString()}
          editable={false}
        />
      </View>
      <View style={styles.optional}>
        <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
          <RadioButton status="checked" />
          <Typo>Accommodation (optional)</Typo>
        </View>
        <CustomSelect
          options={accommodationTypes}
          label={"Select Type"}
          value={accommodation.type}
          onSelect={(v) => handleSelectAccommodation(v)}
        />
        {accommodation.type === "perRoom" && (
          <RoomsForm
            accommodation={accommodation}
            setAccommodation={setAccommodation}
            errors={errors}
            setErrors={setErrors}
          />
        )}
        {accommodation.type === "perPerson" && (
          <PersonsForm
            accommodation={accommodation}
            setAccommodation={setAccommodation}
            errors={errors}
            setErrors={setErrors}
          />
        )}
      </View>
      <View style={styles.optional}>
        <ServicesForm
          services={services}
          setServices={setServices}
          errors={errors}
          setErrors={setErrors}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <CustomButton text={"Save"} onPress={handleSubmit} />
        <CustomButton text={"Add Another Event"} onPress={goToNextEvent} />
      </View>
    </View>
  );
};
export default EventForm;
const styles = StyleSheet.create({
  eventDate: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 8,
    width: "100%",
    borderColor: "#C0BDC0",
  },
  eventType: {
    borderWidth: 2,
    padding: 4,
    gap: 10,
    borderRadius: 6,
    borderColor: "#F0F0F0",
  },
  radio: {
    padding: 5,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  optional: {
    backgroundColor: colors.yellow,
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
});
