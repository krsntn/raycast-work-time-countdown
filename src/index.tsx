import { getPreferenceValues, MenuBarExtra, openCommandPreferences } from "@raycast/api";
import { isWeekend } from "date-fns";
import { getRemainingTime, getIcon, getTitle } from "./utils/time";

export default function Command() {
  const now = new Date();
  const { hours, minutes } = getRemainingTime(now);
  const { includeWeekends, startHour } = getPreferenceValues();

  if (hours < 0 || minutes < 0) {
    return null;
  }

  if (now.getHours() < startHour) {
    return null;
  }

  if (!includeWeekends && isWeekend(now)) {
    return null;
  }

  return (
    <MenuBarExtra icon={getIcon(hours)} title={getTitle(hours, minutes)}>
      <MenuBarExtra.Item
        title="Configure Command"
        shortcut={{ modifiers: ["cmd"], key: "," }}
        onAction={() => openCommandPreferences()}
      />
    </MenuBarExtra>
  );
}
