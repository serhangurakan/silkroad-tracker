import { format, differenceInSeconds, addDays, addHours, parseISO, isAfter, isBefore } from 'date-fns';

export const formatDateTime = (date) => {
  if (!date) return '';
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
};

export const formatTime = (date) => {
  if (!date) return '';
  return format(new Date(date), 'HH:mm');
};

export const formatDuration = (seconds) => {
  if (seconds < 0) return '0s';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

export const getElapsedTime = (lastKillTime) => {
  if (!lastKillTime) return 0;
  const now = new Date();
  const killTime = new Date(lastKillTime);
  return differenceInSeconds(now, killTime);
};

export const getGardenProgress = (lastKillTime) => {
  if (!lastKillTime) return { progress: 0, status: 'not-ready', elapsedHours: 0 };

  const elapsedSeconds = getElapsedTime(lastKillTime);
  const elapsedHours = elapsedSeconds / 3600;

  if (elapsedHours < 4) {
    const remainingHours = 4 - elapsedHours;
    return {
      progress: 0,
      status: 'not-ready',
      elapsedHours,
      message: `Minimum respawn süresine ${remainingHours.toFixed(1)} saat var`
    };
  } else if (elapsedHours <= 8) {
    const progress = ((elapsedHours - 4) / 4) * 100;
    return {
      progress,
      status: 'ready',
      elapsedHours,
      message: `Spawn penceresi içinde (${elapsedHours.toFixed(1)} / 8 saat)`
    };
  } else {
    return {
      progress: 100,
      status: 'overdue',
      elapsedHours,
      message: `8 saati geçti – Spawn ihtimali maksimum (${elapsedHours.toFixed(1)} saat)`
    };
  }
};

// Event için sonraki occurrence hesaplama
export const getNextOccurrence = (event, now = new Date()) => {
  const occurrences = [];

  if (event.type === 'daily') {
    event.times.forEach(timeStr => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      let occurrence = new Date(now);
      occurrence.setHours(hours, minutes, 0, 0);

      // Eğer bugün geçmişse, yarına ekle
      if (occurrence <= now) {
        occurrence = addDays(occurrence, 1);
      }

      occurrences.push({
        time: occurrence,
        type: 'start',
        timeStr
      });
    });
  } else if (event.type === 'weekly') {
    event.times.forEach(timeStr => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        .indexOf(event.daysOfWeek[0]);

      let occurrence = new Date(now);
      occurrence.setHours(hours, minutes, 0, 0);

      const currentDay = occurrence.getDay();
      let daysUntilEvent = dayIndex - currentDay;

      if (daysUntilEvent < 0 || (daysUntilEvent === 0 && occurrence <= now)) {
        daysUntilEvent += 7;
      }

      occurrence = addDays(occurrence, daysUntilEvent);

      occurrences.push({
        time: occurrence,
        type: 'start',
        timeStr
      });
    });
  } else if (event.type === 'range') {
    event.startTimes.forEach((startTimeStr, index) => {
      const [hours, minutes] = startTimeStr.split(':').map(Number);
      let occurrence = new Date(now);
      occurrence.setHours(hours, minutes, 0, 0);

      if (occurrence <= now) {
        occurrence = addDays(occurrence, 1);
      }

      occurrences.push({
        time: occurrence,
        type: 'start',
        timeStr: startTimeStr,
        endTimeStr: event.endTimes[index]
      });
    });
  }

  // En yakın occurrence'ı bul
  occurrences.sort((a, b) => a.time - b.time);
  return occurrences[0] || null;
};

export const getTimeUntilEvent = (eventTime, now = new Date()) => {
  return differenceInSeconds(new Date(eventTime), now);
};

export const parseLogTime = (logLine) => {
  // [04:40:26] formatındaki saati parse et
  const timeMatch = logLine.match(/\[(\d{2}):(\d{2}):(\d{2})\]/);
  if (!timeMatch) return null;

  const [, hours, minutes, seconds] = timeMatch;
  return { hours: parseInt(hours), minutes: parseInt(minutes), seconds: parseInt(seconds) };
};

export const findLastKillTime = (logText, uniqueName, selectedDate) => {
  const lines = logText.split('\n').filter(line => line.trim());
  let lastKillLine = null;

  // En son killed satırını bul
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (line.includes('killed') && line.toLowerCase().includes(uniqueName.toLowerCase())) {
      lastKillLine = line;
      break;
    }
  }

  if (!lastKillLine) return null;

  const timeData = parseLogTime(lastKillLine);
  if (!timeData) return null;

  // Seçilen tarih ile birleştir
  const killDate = selectedDate ? new Date(selectedDate) : new Date();
  killDate.setHours(timeData.hours, timeData.minutes, timeData.seconds, 0);

  return killDate.toISOString();
};
