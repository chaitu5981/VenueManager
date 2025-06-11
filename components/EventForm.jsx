import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Typo from "./Typo";
import {
  capitalize,
  formatDate,
  validateNumber,
  validatePhone,
  validateText,
} from "../utils/helper";
import { useEffect, useRef, useState } from "react";
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
  // noOfPersons: "",
  persons: [],
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
  // noOfPersons: "",
  // personCost: "",
  // persons: [],
  persons: [],
  personsCount: "",
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
  id: "",
});
const EventForm = ({ eventDates, submitEnquiry, loading, events, editing }) => {
  const [eventNo, setEventNo] = useState(1);
  const [event, setEvent] = useState(emptyEvent);
  const [dining, setDining] = useState(emptyDining);
  const [accommodation, setAccommodation] = useState(emptyAccommodation);
  const [services, setServices] = useState([]);
  const [errors, setErrors] = useState({ ...emptyErrors });
  const [shouldSubmitEnquiry, setShouldSubmitEnquiry] = useState(false);
  const eventsToSend = useRef([]);
  const router = useRouter();
  const { subVenues } = useSelector((state) => state.user);
  const subVenuesData = subVenues.map((subVenue) => ({
    label: `${subVenue.sub_venue_name}-${subVenue.sub_venue_capacity}`,
    value: subVenue,
  }));
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
  // console.log(events);
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
  const getEventType = (subEventType) => {
    return eventTypes.find((eventType) =>
      eventType.subEventTypes.some((s) => s.value == subEventType)
    ).value;
  };
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
      bookingFor,
      noOfGuests,
      checkInTime,
      checkOutTime,
      rent,
    } = event;
    const eventDateErr = validateText(eventDate, "Event Date");
    const subEventTypeErr = validateText(subEventType, "Event Type");
    const eventNameErr = validateText(eventName, "Event Name");
    const subVenueErr = validateText(subVenue, "Sub Venue");
    const noOfGuestsErr = validateNumber(noOfGuests, "No of Guests");
    const checkInTimeErr = validateText(checkInTime, "Check-in time");
    const checkOutTimeErr = validateText(checkOutTime, "Check-out time");
    const bookingForErr =
      bookingFor.length == 0 ? "Enter Valid Booking Type " : "";
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

    let servicesErrFlag = false;
    let servicesErr = [];
    if (services.length > 0) {
      servicesErr = services.map((service, i) => {
        let serviceError = { name: "", serviceCost: "" };
        if (!service.name) {
          serviceError.name = "Enter valid Service Name";
          servicesErrFlag = true;
        }
        if (validateNumber(service.serviceCost)) {
          serviceError.serviceCost = "Enter valid Service Cost";
          servicesErrFlag = true;
        }
        return serviceError;
      });
    }
    let personsErrFlag = false;
    let personsErr = [];
    let personsCountErr = "";
    if (accommodation.type == "person") {
      if (accommodation.persons.length == 0)
        personsCountErr = "Add at least one Person";
      else personsCountErr = "";
    }
    if (accommodation.persons.length > 0) {
      personsErr = accommodation.persons.map((person, i) => {
        let personErr = { name: "", phone: "" };
        personErr.name = validateText(person.name, "Name");
        personErr.phone = validatePhone(person.phone, "Phone No");
        if (personErr.name || personErr.phone) personsErrFlag = true;
        return personErr;
      });
    }

    const newErrors = {
      eventDate: eventDateErr,
      subEventType: subEventTypeErr,
      eventName: eventNameErr,
      subVenue: subVenueErr,
      bookingFor: bookingForErr,
      noOfGuests: noOfGuestsErr,
      checkInTime: checkInTimeErr,
      checkOutTime: checkOutTimeErr,
      rent: rentErr,
      noOfPlates: noOfPlatesErr,
      costPerPlate: costPerPlateErr,
      noOfRooms: noOfRoomsErr,
      noOfPersons: noOfPersonsErr,
      persons: personsErr,
      services: servicesErr,
      personsCount: personsCountErr,
    };
    setErrors(newErrors);
    return (
      !eventDateErr &&
      !subEventTypeErr &&
      !eventNameErr &&
      !subVenueErr &&
      !bookingForErr &&
      !noOfGuestsErr &&
      !checkInTimeErr &&
      !checkOutTimeErr &&
      !rentErr &&
      !noOfPlatesErr &&
      !costPerPlateErr &&
      !noOfRoomsErr &&
      !noOfPersonsErr &&
      !servicesErrFlag &&
      !personsErrFlag
      // !personsCountErr
    );
  };

  const saveEvent = () => {
    if (validateEvent()) {
      const newEvent = {
        eventDetails: {
          event_date: event.eventDate,
          event_name: event.eventName,
          event_type: event.subEventType,
          sub_venue_id: event.subVenue.sub_venue_id,
          booking_for: event.bookingFor,
          check_in: event.checkInTime,
          check_out: event.checkOutTime,
          no_of_guests: event.noOfGuests,
          rent_charges: event.rent,
        },
        event_id: event.id,
        accomodationDetails: {
          charge_type: accommodation.type,
          no_of_rooms: accommodation.noOfRooms,
          persons_data:
            accommodation.persons.length > 0
              ? accommodation.persons.map((p) => ({
                  persons_name: p.name,
                  person_phone: p.phone,
                }))
              : [],
          rooms_data: [],
        },
        diningDetails: {
          menu: dining.menu,
          no_of_plates: dining.noOfPlates,
          cost_per_plate: dining.costPerPlate,
          total_menu_cost:
            Number(dining.costPerPlate) * Number(dining.noOfPlates).toString(),
        },
        serviceDetails: services.map((s) => ({
          service_name: s.name,
          service_charge: s.serviceCost,
        })),
      };
      if (editing) {
        eventsToSend.current[eventNo - 1] = newEvent;
      } else eventsToSend.current.push(newEvent);
    }
  };
  const goToNextEvent = () => {
    saveEvent();
    if (!editing || eventNo >= events.length) {
      setEvent(emptyEvent);
      setDining(emptyDining);
      setAccommodation(emptyAccommodation);
      setServices([]);
    }
    setEventNo(eventNo + 1);
  };
  // console.log(eventNo, "eventNo");
  useEffect(() => {
    if (shouldSubmitEnquiry) {
      submitEnquiry(eventsToSend.current);
      setShouldSubmitEnquiry(false);
    }
  }, [shouldSubmitEnquiry]);
  useEffect(() => {
    if (editing && eventNo <= events.length) {
      const currEvent = events[eventNo - 1];
      setEvent({
        eventType: getEventType(currEvent.event_type),
        subEventType: currEvent.event_type,
        eventName: currEvent.event_name,
        subVenue: subVenues.find(
          (sv) => sv.sub_venue_id == currEvent.event_subvenue_id
        ),
        bookingFor: currEvent.event_booking_for,
        noOfGuests: currEvent.event_no_of_guests,
        eventDate: currEvent.event_date,
        checkInTime: currEvent.event_check_in,
        checkOutTime: currEvent.event_check_out,
        rent: currEvent.event_rent_charges,
        id: currEvent.id,
      });
      if (currEvent.dining_menu) {
        setDining({
          menu: currEvent.dining_menu,
          noOfPlates: currEvent.dining_no_of_plates,
          costPerPlate: currEvent.dining_cost_per_plate,
          totalDiningCost: currEvent.dining_total_menu_cost,
        });
      }
      setAccommodation({
        type: currEvent.accomodation_charge_type,
        noOfRooms: currEvent.accomodation_no_of_rooms,
        persons:
          currEvent.accomodation_persons_data.length > 0
            ? currEvent.accomodation_persons_data.map((p, i) => ({
                id: i + 1,
                name: p.persons_name,
                phone: p.person_phone,
              }))
            : [],
      });
      setServices(
        currEvent.service_details.map((s, i) => ({
          id: i + 1,
          name: s.service_name,
          serviceCost: s.service_charge.toString(),
        }))
      );
      setErrors({
        ...emptyErrors,
        persons:
          currEvent.accomodation_persons_data.length > 0
            ? currEvent.accomodation_persons_data.map((p, i) => ({
                id: i + 1,
                name: "",
                phone: "",
              }))
            : [],
        services:
          currEvent.service_details.length > 0
            ? currEvent.service_details.map((s, i) => ({
                id: i + 1,
                name: "",
                serviceCost: "",
              }))
            : [],
      });
    }
  }, [editing, eventNo]);
  useEffect(() => {
    if (editing) {
      eventsToSend.current = events.map((event) => ({
        eventDetails: {
          event_date: event.event_date,
          event_name: event.event_name,
          event_type: event.event_type,
          sub_venue_id: event.event_subvenue_id,
          booking_for: [...event.event_booking_for],
          check_in: event.event_check_in,
          check_out: event.event_check_out,
          no_of_guests: event.event_no_of_guests,
          rent_charges: event.event_rent_charges,
        },
        event_id: event.id,
        accomodationDetails: {
          charge_type: event.accomodation_charge_type,
          no_of_rooms: event.accomodation_no_of_rooms,
          persons_data: JSON.parse(
            JSON.stringify(event.accomodation_persons_data)
          ),
          rooms_data: [],
        },
        diningDetails: {
          menu: event.dining_menu,
          no_of_plates: event.dining_no_of_plates,
          cost_per_plate: event.dining_cost_per_plate,
          total_menu_cost: event.dining_total_menu_cost,
        },
        serviceDetails: JSON.parse(JSON.stringify(event.service_details)),
      }));
    } else eventsToSend.current = [];
  }, []);
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
            ? new Date(event.checkInTime).toLocaleTimeString("en-in", {
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
            ? new Date(event.checkOutTime).toLocaleTimeString("en-in", {
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
                persons: [],
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
          <PersonsForm
            accommodation={accommodation}
            setAccommodation={setAccommodation}
            errors={errors}
            setErrors={setErrors}
          />
          // <CustomTextInput
          //   label={"No Of Persons"}
          //   value={accommodation.noOfPersons}
          //   onChange={(v) => {
          //     setAccommodation({
          //       ...accommodation,
          //       noOfPersons: v,
          //       noOfRooms: "",
          //     });
          //     setErrors({
          //       ...errors,
          //       noOfPersons:
          //         accommodation.type == "person"
          //           ? validateNumber(v, "No Of Persons")
          //           : "",
          //     });
          //   }}
          //   error={errors.noOfPersons}
          // />
        )}
        {errors.personsCount && (
          <HelperText visible={!!errors.personsCount} type="error">
            {errors.personsCount}
          </HelperText>
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
        <CustomButton
          loading={loading}
          text={"Save"}
          onPress={() => {
            saveEvent();
            setShouldSubmitEnquiry(true);
          }}
        />
        <CustomButton
          text={
            editing && eventNo < events.length
              ? "Go To Next Event"
              : "Add Another Event"
          }
          onPress={goToNextEvent}
        />
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
