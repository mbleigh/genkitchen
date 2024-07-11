"use client";
import { Button, Option, Select, Slider, Textarea } from "@material-tailwind/react";
import Header from "./Header";
import Placeholder from "./Placeholder";
import { useEffect, useRef, useState } from "react";
import { UserPreferences, type GenerateItineraryOutput } from "../ai/generateItinerary";
import { generateItinerary } from "./actions";
import Itinerary from "./Itinerary";
import { useOutsideAlerter } from "./outsideAlerter";

export default function GenerateItinerary() {
  const [showForm, setShowForm] = useState<boolean>(true);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [itinerary, setItinerary] = useState<GenerateItineraryOutput | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const [generating, setGenerating] = useState<boolean>(false);

  const energyLevelRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useOutsideAlerter(formRef, () => {
    setShowForm(false);
  });
  useEffect(() => {
    if (!preferences) return;
    setGenerating(true);
    const input = {
      preferences,
      previousItinerary: itinerary,
      destination: destination!,
    };
    console.log("Generating with preferences", input);
    generateItinerary(input).then((itinerary) => {
      console.log("New itinerary:", itinerary);
      setItinerary(itinerary);
      setGenerating(false);
    });
  }, [preferences]);

  return (
    <div className="relative bg-white sm:max-w-[430px] sm:h-[932px] sm:mx-auto sm:mt-12 sm:border-[10px] sm:shadow-2xl sm:border-black sm:rounded-[40px] sm:overflow-hidden scale-100">
      <div className="overflow-y-scroll h-full w-full pb-24">
        <Header />
        {!itinerary && <Placeholder />}
        {itinerary && preferences && (
          <Itinerary
            itinerary={itinerary}
            destination={destination!}
            setItinerary={setItinerary}
            preferences={preferences}
          />
        )}
      </div>
      <form
        ref={formRef}
        className={`bg-white px-6 pb-6 pt-12 fixed bottom-0 left-0 right-0 shadow-above  transition-all ${
          !showForm && ` translate-y-full opacity-0`
        }`}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          for (const entry of formData.entries()) {
            console.log(entry);
          }
          const notes = formData.get("notes")?.toString();
          const mustDoItems = formData
            .get("mustDo")
            ?.toString()
            .split("\n")
            .filter((t) => !!t.trim());
          setPreferences({
            notes,
            energyLevel: energyLevelRef.current?.value!,
            mustDo: mustDoItems?.length ? mustDoItems : undefined,
          });
          setShowForm(false);
        }}
      >
        <Select
          label="Select Destination"
          name="destination"
          value={destination || undefined}
          onChange={(value) => {
            setDestination(value || null);
          }}
        >
          <Option value="kyoto">Kyoto, Japan</Option>
          <Option value="new-orleans">New Orleans, United States</Option>
          <Option value="marrakech">Marrakech, India</Option>
        </Select>
        <div className="flex items-center my-6">
          <div className="mr-4 text-right">Relaxing</div>
          <Slider
            defaultValue={50}
            min={0}
            max={100}
            color="deep-purple"
            inputRef={energyLevelRef}
          />
          <div className="ml-4 text-left">Whirlwind</div>
        </div>
        <div className="mt-4">
          <p className="text-xs text-center mb-2">What activities are a "must-do" for you?</p>
          <Textarea label="Activities (one per line)" color="deep-purple" name="mustDo" />
        </div>
        <div className="mt-4">
          <Textarea label="Other Notes" color="deep-purple" name="notes" />
        </div>
        <div className="text-center mt-4">
          <Button type="submit" color="deep-purple">
            {itinerary ? "Update my Plan" : "Plan My Day"}
          </Button>
        </div>
      </form>
      <div
        className={`absolute bottom-0 left-0 right-0 text-white${
          !generating && " translate-y-full"
        } transition-all`}
      >
        <div className="h-32 bg-gradient-to-t from-deep-purple-500 to-transparent" />
        <div className="bg-gradient-to-t from-deep-purple-800 to-deep-purple-500 py-16">
          <div className="animate-pulse text-center text-4xl font-extrabold text-white">
            Planning your day&hellip;
          </div>
        </div>
      </div>
      {!showForm && !generating && (
        <button
          className="fixed bottom-6 right-6 bg-deep-purple-800 text-white rounded-full p-4 shadow-md"
          onClick={() => {
            setShowForm(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
