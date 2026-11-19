import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { ZodError } from "zod";

export function handleErrorWithToastNotification({
  error,
}: {
  error: unknown;
}) {
  if (isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 429) {
        toast.error("Too many requests. Please try again later.");
      } else if (error.response.status === 413) {
        toast.error(
          "Request is too large. Please try compressing the attached files.",
        );
      } else if (
        [400, 401, 403].includes(error.response.status) &&
        typeof error.response?.data?.message === "string"
      ) {
        toast.error(error.response.data.message);
      } else if (
        error.response.status === 401 &&
        error.response?.data?.message === "Unauthorized"
      ) {
        toast.error("Unauthorized");
      } else {
        if (error.response?.data) {
          if (error.response.data?.message) {
            toast.error(
              `Server error occured: ${error.response.data.message ?? "unknown"}`,
            );
          } else {
            toast.error(
              `Server error occured: ${JSON.stringify(error.response.data)}`,
            );
          }
        } else {
          toast.error(`Server error occured: unknown (no data)`);
        }
      }
    } else if (error.request) {
      toast.error(
        "Network error occured. Please check your internet connection and try again.",
      );
    } else {
      toast.error("Unknown error occured.");
      console.log("Unknown error occured:", error);
    }
  } else if (error instanceof ZodError) {
    toast.error(`Zod error occured: ${error.message}`);
    console.log("Zod error occured:", error);
  } else {
    toast.error("Unknown generic error occured.");
    console.log("Unknown generic error occured:", error);
  }
}
