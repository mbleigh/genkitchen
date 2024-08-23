import {
  LandscapeOutlined,
  LocalDiningOutlined,
  SelfImprovementOutlined,
  SpaOutlined,
  StarBorder,
  TheaterComedyOutlined,
} from "@mui/icons-material";
import {
  GenerateItineraryOutput,
  ReviseActivityInput,
  ReviseActivityOutput,
  UserPreferences,
} from "../server/index.js";
import { ReactNode, useEffect, useState } from "react";
import destinations from "../data.js";
import { Input, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import { post } from "../../common/client/util.js";

async function reviseItinerary(input: ReviseActivityInput) {
  return post<ReviseActivityOutput>("/api/itinerary/revise", input);
}

const icons: Record<string, ReactNode> = {
  meal: <LocalDiningOutlined fontSize="small" className="text-orange-300" />,
  nature: <SpaOutlined fontSize="small" className="text-blue-300" />,
  landmark: <LandscapeOutlined fontSize="small" className="text-green-200" />,
  entertainment: <TheaterComedyOutlined fontSize="small" className="text-red-200" />,
  relax: <SelfImprovementOutlined fontSize="small" className="text-purple-200" />,
};

function ImageForRef({
  destination,
  activity,
}: {
  destination: string;
  activity: string;
  preferences: UserPreferences;
}) {
  const activityData = (destinations as any)[destination].activities.find(
    (a: any) => a.ref === activity
  );
  if (!activityData) return <></>;
  return <img src={activityData.imageUrl} />;
}

export default function Itinerary({
  destination,
  itinerary: { activities },
  preferences,
  setItinerary,
}: {
  destination: string;
  itinerary: GenerateItineraryOutput;
  preferences: UserPreferences;
  setItinerary: (i: any) => void;
}) {
  const [revisionNotes, setRevisionNotes] = useState<string[]>([]);
  const [isRevising, setIsRevising] = useState<boolean[]>([]);

  useEffect(() => {
    console.log(isRevising);
  }, [isRevising]);

  return (
    <div className="px-6">
      {activities.map((a, i) => {
        if (isRevising[i])
          return (
            <div className="text-center text-2xl font-extrabold text-deep-purple-700 animate-pulse">
              Revising&hellip;
            </div>
          );
        return (
          <div className="my-4" key={i}>
            <div className="flex items-center">
              <div className="text-xs text-gray-800 p-2 flex-1">
                {a.startTime}
                <span className="text-gray-400">&mdash;{a.endTime}</span>
              </div>

              <button
                className="text-gray-400"
                title="Revise this activity."
                onClick={() => {
                  if (!revisionNotes[i]) {
                    revisionNotes[i] = " ";
                    setRevisionNotes([...revisionNotes]);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
              <Popover placement="top-end">
                <PopoverHandler>
                  <div className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </PopoverHandler>
                <PopoverContent
                  className="max-w-64 py-2 px-3 text-xs bg-gray-900 text-white"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <div>{a.rationale}</div>
                </PopoverContent>
              </Popover>
              {a.mustDo && (
                <Popover placement="top-end">
                  <PopoverHandler>
                    <div className="text-yellow-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </PopoverHandler>
                  <PopoverContent
                    className="py-2 px-3 text-xs bg-gray-900 text-white"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <div>{a.mustDo}</div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            {revisionNotes[i] && (
              <form
                className="my-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const notes = new FormData(e.target as HTMLFormElement)
                    .get("revisionNotes")
                    ?.toString();
                  if (!!notes?.trim()) {
                    isRevising[i] = true;
                    setIsRevising([...isRevising]);
                    const { activity } = await reviseItinerary({
                      destination,
                      previousItinerary: { activities },
                      preferences,
                      revisionNotes: notes,
                      activityIndex: i,
                    });
                    revisionNotes[i] = "";
                    setRevisionNotes([...revisionNotes]);
                    activities.splice(i, 1, activity);
                    setItinerary({ activities: [...activities] });
                    isRevising[i] = false;
                    setIsRevising([...isRevising]);
                  }
                }}
              >
                <Input
                  name="revisionNotes"
                  value={revisionNotes[i]}
                  color="orange"
                  label="Revision Notes"
                  crossOrigin={undefined}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onInput={(e) => {
                    revisionNotes[i] = (e.target as HTMLInputElement).value;
                    setRevisionNotes([...revisionNotes]);
                  }}
                />
              </form>
            )}
            {a.ref && (
              <div className="rounded-t-xl overflow-hidden">
                <ImageForRef destination={destination} activity={a.ref} preferences={preferences} />
              </div>
            )}
            <div
              className={`border border-gray-300 rounded-xl p-3 text-sm${
                a.ref && " rounded-t-none border-t-none"
              }`}
            >
              <div className="font-bold flex items-center mb-2">
                <div className="mr-2">{icons[a.type]}</div> <div>{a.title}</div>
              </div>
              <p className="text-xs">{a.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
