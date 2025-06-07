import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Typo from "./Typo";
import {
  capitalize,
  formatDate,
  validateNumber,
  validateText,
} from "../utils/helper";
import { useState } from "react";
import {
  accommodationTypes,
  bookingTypes,
  diningMenu,
  eventTypes,
} from "../data/constants";
import { colors } from "../data/theme";
import { HelperText, RadioButton } from "react-native-paper";
import CustomSelect from "./CustomSelect";
import CustomTextInput from "./CustomTextInput";
import CustomButton from "./CustomButton";
import TimePicker from "./TimePicker";
import RoomsForm from "./RoomsForm";
import PersonsForm from "./PersonsForm";
import ServicesForm from "./ServicesForm";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import CustomMultiSelect from "./CustomMultiSelect";

const emptyDining = {
  menu: "",
  noOfPlates: "",
  costPerPlate: "",
  totalDiningCost: "",
};
const emptyAccommodation = {
  type: "",
  noOfRooms: "",
  noOfPersons: "",
  // rooms: {
  //   list: [],
  // },
  // persons: {
  //   costPerPerson: "",
  //   totalPersonsCost: "",
  //   list: [],
  // },
};
const emptyErrors = {
  eventDate: "",
  subEventType: "",
  eventName: "",
  subVenue: "",
  bookingFor: "",
  noOfGuests: "",
  checkInTime: "",
  checkOutTime: "",
  rent: "",
  noOfPlates: "",
  costPerPlate: "",
  noOfRooms: "",
  // rooms: [],
  noOfPersons: "",
  // personCost: "",
  // persons: [],
  services: [],
};
const emptyEvent = () => ({
  eventType: "traditional",
  subEventType: "",
  eventName: "",
  subVenue: "",
  bookingFor: [],
  noOfGuests: "",
  eventDate: "",
  checkInTime: "",
  checkOutTime: "",
  rent: "",
});
const EventForm = ({ setEvents, enquiry, enquiryId }) => {
  const [eventNo, setEventNo] = useState(1);
  const [event, setEvent] = useState(emptyEvent);
  const [dining, setDining] = useState(emptyDining);
  const [accommodation, setAccommodation] = useState(emptyAccommodation);
  const [services, setServices] = useState([]);
  const [errors, setErrors] = useState({ ...emptyErrors });
  const router = useRouter();
  const { subVenues } = useSelector((state) => state.user);
  const subVenuesData = subVenues.map((subVenue) => ({
    label: `${subVenue.sub_venue_name}-${subVenue.sub_venue_capacity}`,
    value: subVenue,
  }));
  const eventDatesData = enquiry.eventDates.map((date) => ({
    value: date,
    label: formatDate(date),
  }));
  const getSubEventTypes = () => {
    const selectedEventType = eventTypes.find(
      (e) => e.value == event.eventType
    );
    return selectedEventType.subEventTypes;
  };
  // const handleSelectAccommodation = (v) => {
  //   if (v == "perRoom") {
  //     setAccommodation({
  //       ...accommodation,
  //       type: v,
  //       rooms: {
  //         noOfRooms: 1,
  //         list: [{ roomNo: "", roomCost: 0 }],
  //       },
  //       persons: {
  //         noOfPersons: 0,
  //         list: [],
  //       },
  //     });
  //     setErrors({
  //       ...errors,
  //       rooms: [{ roomNo: "", roomCost: "" }],
  //       persons: [],
  //     });
  //   } else {
  //     setAccommodation({
  //       ...accommodation,
  //       type: v,
  //       rooms: {
  //         noOfRooms: 0,
  //         list: [],
  //       },
  //       persons: {
  //         noOfPersons: 1,
  //         personCost: 0,
  //         list: [{ name: "", contactNo: "" }],
  //       },
  //     });
  //     setErrors({
  //       ...errors,
  //       persons: [{ name: "", contactNo: "" }],
  //       rooms: [],
  //     });
  //   }
  // };
  const setBookingFor = (v) => {
    let newBookingFor;
    if (event.bookingFor.includes(v)) {
      if (v == "WholeDay") newBookingFor = [];
      else newBookingFor = event.bookingFor.filter((b) => b != v);
    } else {
      if (v == "WholeDay") newBookingFor = bookingTypes.map((b) => b.value);
      else newBookingFor = [...event.bookingFor, v];
    }
    setEvent({ ...event, bookingFor: newBookingFor });
    if (newBookingFor.length == 0)
      setErrors({ ...errors, bookingFor: "Select Booking For" });
    else setErrors({ ...errors, bookingFor: "" });
  };
  const validateEvent = () => {
    const {
      eventDate,
      subEventType,
      eventName,
      subVenue,
      bookingType,
      noOfGuests,
      checkInTime,
      checkOutTime,
      rent,
    } = event;
    const eventDateErr = validateText(eventDate, "Event Date");
    const subEventTypeErr = validateText(subEventType, "Event Type");
    const eventNameErr = validateText(eventName, "Event Name");
    const subVenueErr = validateText(subVenue, "Sub Venue");
    const bookingTypeErr = validateText(bookingType, "Booking Type");
    const noOfGuestsErr = validateNumber(noOfGuests, "No of Guests");
    const checkInTimeErr = validateText(checkInTime, "Check-in time");
    const checkOutTimeErr = validateText(checkOutTime, "Check-out time");
    let noOfPlatesErr = "",
      costPerPlateErr = "";
    if (dining.menu) {
      noOfPlatesErr = validateNumber(dining.noOfPlates);
      costPerPlateErr = validateNumber(dining.costPerPlate);
    }
    const rentErr = validateNumber(rent, "Rent");
    let noOfRoomsErr = "",
      noOfPersonsErr = "";
    if (accommodation.type == "room")
      noOfRoomsErr = validateNumber(accommodation.noOfRooms, "No of Rooms");
    if (accommodation.type == "person")
      noOfPersonsErr = validateNumber(
        accommodation.noOfPersons,
        "No of Persons"
      );
    let servicesErrFlag = false;
    let servicesErr = [];
    if (services.length > 0) {
      servicesErr = services.map((service, i) => {
        let serviceError = { name: "", serviceCost: "" };
        if (!service.name.trim()) {
          serviceError.name = "Enter valid Service Name";
          servicesErrFlag = true;
        }
        if (isNaN(service.serviceCost) || service.serviceCost <= 0) {
          serviceError.serviceCost = "Enter valid Service Cost";
          servicesErrFlag = true;
        }
        return serviceError;
      });
    }
    // console.log(servicesErrFlag);

    const newErrors = {
      eventDate: eventDateErr,
      subEventType: subEventTypeErr,
      eventName: eventNameErr,
      subVenue: subVenueErr,
      bookingType: bookingTypeErr,
      noOfGuests: noOfGuestsErr,
      checkInTime: checkInTimeErr,
      checkOutTime: checkOutTimeErr,
      rent: rentErr,
      noOfPlates: noOfPlatesErr,
      costPerPlate: costPerPlateErr,
      noOfRooms: noOfRoomsErr,
      noOfPersons: noOfPersonsErr,
      services: servicesErr,
    };
    setErrors(newErrors);
    return (
      !eventDateErr &&
      !subEventTypeErr &&
      !eventNameErr &&
      !subVenueErr &&
      !bookingTypeErr &&
      !noOfGuestsErr &&
      !checkInTimeErr &&
      !checkOutTimeErr &&
      !rentErr &&
      !noOfPlatesErr &&
      !costPerPlateErr &&
      !noOfRoomsErr &&
      !noOfPersonsErr &&
      !servicesErrFlag
    );
  };

  const saveEvent = () => {};

  const goToNextEvent = () => {
    console.log(errors);
    console.log(validateEvent());
    if (validateEvent()) {
      setEvents((prev) => [
        ...prev,
        {
          enquiry: {
            user_id: enquiry.userId,
            enquiry_id: enquiryId,
            name: enquiry.name,
            country_code: enquiry.code,
            phone_no: enquiry.phone,
            email: enquiry.email,
            appointment_date: enquiry.eventDates,
            notes: enquiry.notes,
          },
          eventDetails: {
            event_date: event.eventDate,
            event_name: event.eventName,
            event_type: event.subEventType,
            sub_venue_id: event.subVenue.sub_venue_id,
            sub_venue: {
              sub_venue_id: event.subVenue.sub_venue_id,
              sub_venue_name: event.subVenue.sub_venue_name,
              sub_venue_type: event.subVenue.sub_venue_type,
              sub_venue_capacity: event.subVenue.sub_venue_capacity,
            },
            booking_for: event.bookingFor,
            check_in: event.checkInTime,
            check_out: event.checkOutTime,
            no_of_guests: event.noOfGuests,
            rent_charges: event.rent,
          },
          event_id: "",
          accomodationDetails: {
            charge_type: accommodation.type,
            no_of_rooms: accommodation.noOfRooms,
            no_of_persons: accommodation.noOfPersons,
            rooms_data: [],
            persons_data: [],
          },
          diningDetails: {
            menu: dining.menu,
            no_of_plates: dining.noOfPlates,
            cost_per_plate: dining.costPerPlate,
            total_menu_cost:
              Number(dining.costPerPlate) * Number(dining.noOfPlates),
          },
          serviceDetails: services.map((s) => ({
            service_name: s.name,
            service_charge: s.serviceCost,
          })),
        },
      ]);
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
        error={errors.eventDate}
        value={event.eventDate ? formatDate(event.eventDate) : ""}
        onSelect={(v) => {
          setEvent({ ...event, eventDate: v });
          setErrors({
            ...errors,
            eventDate: validateText(v, "Event Type"),
          });
        }}
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
                        onSelect={(v) => {
                          setEvent({ ...event, subEventType: v });
                          setErrors({
                            ...errors,
                            subEventType: validateText(v, "Event Type"),
                          });
                        }}
                        label={`Select ${capitalize(eType.value)} Event`}
                      />
                    ) : (
                      <CustomTextInput
                        label={"Enter Event Type"}
                        value={event.subEventType}
                        onChange={(v) => {
                          setEvent({ ...event, subEventType: v.trim() });
                          setErrors({
                            ...errors,
                            subEventType: validateText(v, "Event Type"),
                          });
                        }}
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
      <CustomTextInput
        label="Event Name"
        value={event.eventName}
        onChange={(v) => {
          setEvent({ ...event, eventName: v });
          setErrors({ ...errors, eventName: validateText(v, "Event Name") });
        }}
        error={errors.eventName}
      />
      <CustomSelect
        label="Sub Venue Type"
        options={subVenuesData}
        value={event.subVenue.sub_venue_name}
        onSelect={(v) => {
          setEvent({ ...event, subVenue: v });
          setErrors({ ...errors, subVenue: validateText(v, "Sub Venue") });
        }}
        error={errors.subVenue}
      />
      <CustomMultiSelect
        label="Booking For"
        options={bookingTypes}
        values={event.bookingFor}
        onSelect={(v) => setBookingFor(v)}
        error={errors.bookingFor}
      />
      <CustomTextInput
        label={"No of Guests"}
        value={event.noOfGuests}
        onChange={(v) => {
          setEvent({ ...event, noOfGuests: v });
          setErrors({
            ...errors,
            noOfGuests: validateNumber(v, "No of Guests"),
          });
        }}
        error={errors.noOfGuests}
      />
      <TimePicker
        label={"Check In Time"}
        value={
          event.checkInTime
            ? event.checkInTime.toLocaleTimeString("en-in", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""
        }
        onConfirm={(v) => {
          setEvent({ ...event, checkInTime: v });
          setErrors({
            ...errors,
            checkInTime: validateText(v, "Check In Time"),
          });
        }}
        error={errors.checkInTime}
      />
      <TimePicker
        label={"Check Out Time"}
        value={
          event.checkOutTime
            ? event.checkOutTime.toLocaleTimeString("en-in", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""
        }
        onConfirm={(v) => {
          setEvent({ ...event, checkOutTime: v });
          setErrors({
            ...errors,
            checkOutTime: validateText(v, "Check Out Time"),
          });
        }}
        error={errors.checkOutTime}
      />
      <CustomTextInput
        label={"Rent Charges"}
        value={event.rent}
        onChange={(v) => {
          setEvent({ ...event, rent: v });
          setErrors({ ...errors, rent: validateNumber(v, "Rent") });
        }}
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
          optional
          value={dining.menu}
          onSelect={(v) => setDining({ ...dining, menu: v })}
        />
        <CustomTextInput
          label={"No Of Plates"}
          value={dining.noOfPlates}
          onChange={(v) => {
            setDining({ ...dining, noOfPlates: v });
            setErrors({
              ...errors,
              noOfPlates: dining.menu ? validateNumber(v, "No of Plates") : "",
            });
          }}
          error={errors.noOfPlates}
        />
        <CustomTextInput
          label={"Cost per Plate"}
          value={dining.costPerPlate}
          onChange={(v) => {
            setDining({ ...dining, costPerPlate: v });
            setErrors({
              ...errors,
              costPerPlate: dining.menu
                ? validateNumber(v, "Cost per Plate")
                : "",
            });
          }}
          error={errors.costPerPlate}
        />
        <CustomTextInput
          label={"Total Menu Cost"}
          value={(
            Number(dining.costPerPlate) * Number(dining.noOfPlates)
          ).toString()}
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
          optional
          label={"Select Type"}
          value={accommodation.type}
          onSelect={(v) => setAccommodation({ ...accommodation, type: v })}
        />
        {accommodation.type === "room" && (
          // <RoomsForm
          //   accommodation={accommodation}
          //   setAccommodation={setAccommodation}
          //   errors={errors}
          //   setErrors={setErrors}
          // />

          <CustomTextInput
            label={"No Of Rooms"}
            value={accommodation.noOfRooms}
            onChange={(v) => {
              setAccommodation({
                ...accommodation,
                noOfRooms: v,
                noOfPersons: "",
              });
              setErrors({
                ...errors,
                noOfRooms:
                  accommodation.type == "room"
                    ? validateNumber(v, "No Of Rooms")
                    : "",
              });
            }}
            error={errors.noOfRooms}
          />
        )}
        {accommodation.type === "person" && (
          // <PersonsForm
          //   accommodation={accommodation}
          //   setAccommodation={setAccommodation}
          //   errors={errors}
          //   setErrors={setErrors}
          // />
          <CustomTextInput
            label={"No Of Persons"}
            value={accommodation.noOfPersons}
            onChange={(v) => {
              setAccommodation({
                ...accommodation,
                noOfPersons: v,
                noOfRooms: "",
              });
              setErrors({
                ...errors,
                noOfPersons:
                  accommodation.type == "person"
                    ? validateNumber(v, "No Of Persons")
                    : "",
              });
            }}
            error={errors.noOfPersons}
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
