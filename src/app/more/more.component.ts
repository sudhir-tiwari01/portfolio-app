import { Component, OnInit } from "@angular/core";
import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-more",
  templateUrl: "./more.component.html",
  styleUrls: ["./more.component.css"],
})
export class MoreComponent implements OnInit {
  // FullCalendar options for monthly view
  monthCalendarOptions!: CalendarOptions;

  // UI state:
  showTimeSlots: boolean = false;    // when a date is clicked
  showForm: boolean = false;         // when a valid time slot is clicked

  // Selected date and time
  selectedDate: string = "";  // e.g. "2025-05-20"
  selectedTime: string = "";  // e.g. "14:30"

  // All 30-minute time slots from 08:00 to 19:30
  timeSlots: string[] = [];
  // Filtered slots (excludes past times if selectedDate == today)
  filteredSlots: string[] = [];

  // Form fields:
  formSubject: string = "";
  formMessage: string = "";

  // Owner email for mailto:
  ownerEmail: string = "sudhirtiwari1998@gmail.com";

  // Today's date in "YYYY-MM-DD" format
  todayYYYYMMDD: string = "";

  // Track the last‐clicked date cell so we can remove its highlight
  private lastClickedEl: HTMLElement | null = null;

  constructor(private snackBar: MatSnackBar) {
    this.generateTimeSlots();
    this.todayYYYYMMDD = this.getTodayString();
  }

  ngOnInit(): void {
    // Configure the FullCalendar for a month view, disallowing past dates
    this.monthCalendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "",
      },
      dateClick: this.handleDateClick.bind(this),
      validRange: {
        start: this.todayYYYYMMDD,
      },
      height: "auto",
    };
  }

  // Generate every 30-minute slot between 08:00 and 19:30
  private generateTimeSlots() {
    const slots: string[] = [];
    for (let hour = 8; hour < 20; hour++) {
      slots.push(this.pad(hour) + ":00");
      slots.push(this.pad(hour) + ":30");
    }
    this.timeSlots = slots;
  }

  private pad(n: number): string {
    return n < 10 ? "0" + n : "" + n;
  }

  // Return today as "YYYY-MM-DD"
  private getTodayString(): string {
    const now = new Date();
    const y = now.getFullYear();
    const m = this.pad(now.getMonth() + 1);
    const d = this.pad(now.getDate());
    return `${y}-${m}-${d}`;
  }

  // Called when the user clicks a date cell
  handleDateClick(clickInfo: any) {
    const dayEl = clickInfo.dayEl as HTMLElement;

    // 1) Remove highlight from previous cell (if any)
    if (this.lastClickedEl) {
      this.lastClickedEl.classList.remove("selected-date-cell");
    }
    // 2) Add highlight + pulse animation to the clicked cell
    dayEl.classList.add("selected-date-cell", "animate-pulse-date");
    setTimeout(() => {
      dayEl.classList.remove("animate-pulse-date");
    }, 600); // match pulse animation duration

    this.lastClickedEl = dayEl;

    // 3) Store selected date and show time slots
    this.selectedDate = clickInfo.dateStr;  // e.g. "2025-05-20"
    this.showTimeSlots = true;
    this.showForm = false;
    this.selectedTime = "";

    // 4) Filter out past time slots if the date is today
    this.filteredSlots = this.timeSlots.filter((slot) => {
      if (this.selectedDate === this.todayYYYYMMDD) {
        const [h, m] = slot.split(":").map((v) => +v);
        const now = new Date();
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        const slotMinutes = h * 60 + m;
        return slotMinutes > nowMinutes;
      }
      return true; // future date → keep all slots
    });
  }

  // Called when a user clicks a specific time slot button
  selectTime(slot: string) {
    this.selectedTime = slot;
    this.showForm = true;
    this.showTimeSlots = false;
  }

  // Go back from time slots → month view
  backToMonth() {
    this.selectedDate = "";
    this.selectedTime = "";
    this.showTimeSlots = false;
    this.showForm = false;
    // Remove highlight if user goes back to month
    if (this.lastClickedEl) {
      this.lastClickedEl.classList.remove("selected-date-cell");
      this.lastClickedEl = null;
    }
  }

  // Go back from form → time slots view
  backToSlots() {
    this.selectedTime = "";
    this.showForm = false;
    this.showTimeSlots = true;
    this.formSubject = "";
    this.formMessage = "";
  }

  // Convert “YYYY-MM-DD” + “HH:MM” into friendly format
  formatSelectedSlot(): string {
    if (!this.selectedDate || !this.selectedTime) return "";
    const [year, month, day] = this.selectedDate.split("-").map((v) => +v);
    const [hour, minute] = this.selectedTime.split(":").map((v) => +v);
    const dt = new Date(year, month - 1, day, hour, minute);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return dt.toLocaleString(undefined, options);
  }

  // Build and open the mailto: link
  sendEmail() {
    if (!this.formSubject.trim() || !this.formMessage.trim()) {
      this.snackBar.open("Please fill in both subject and message.", "", {
        duration: 2000,
      });
      return;
    }

    const slotText = this.formatSelectedSlot();
    const subject = encodeURIComponent(
      `Meeting Request: ${slotText} – ${this.formSubject}`
    );
    const bodyLines = [
      `Hello Sudhir,`,
      ``,
      `I’d like to book the time slot: ${slotText}.`,
      ``,
      `Agenda/Subject: ${this.formSubject}`,
      ``,
      `Message:`,
      this.formMessage,
      ``,
      `Best regards,`,
      `[Your Name]`,
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));

    const mailtoLink = `mailto:${this.ownerEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    this.snackBar.open("Opening mail client...", "", { duration: 2000 });

    // Reset everything so user can re‐book if desired
    this.backToMonth();
  }
}
