import { AfterViewInit, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    function scrambleText(label:any) {
      const originalText = label.dataset.text;
      let iteration = 0;

      const interval = setInterval(() => {
        label.innerText = originalText
          .split("")
          .map((char:any, index:any) => {
            if (index < iteration) return originalText[index];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");

        if (iteration >= originalText.length) clearInterval(interval);
        iteration += 1 / 3; // Adjust speed
      }, 30);
    }

    document.querySelectorAll(".scramble").forEach((label) => {
      document.querySelectorAll(".form2").forEach((form) => {
        form.addEventListener("mouseenter", () => scrambleText(form.firstChild))
      })
    });
  }


  name!: string
  email!: string
  phone!: string
  inquiry!: string
  message!: string
  sendmessage(e: Event, f: NgForm): void {
    e.preventDefault();
    document.querySelectorAll("input").forEach((input) => {
      input.nextElementSibling?.classList.remove("empty");
      input.previousElementSibling?.classList.remove("empty")
    })
    const textarea = document.querySelector("textarea")
    if (textarea) {
      textarea.nextElementSibling?.classList.remove("empty");
      textarea.previousElementSibling?.classList.remove("empty")
    }
    if (!f.valid) {
      document.querySelectorAll("input").forEach((input) => {
        if (input.value == "") {
          input.nextElementSibling?.classList.add("empty");
          input.previousElementSibling?.classList.add("empty")
        }
      })
      if (textarea?.value == "") {
        textarea.nextElementSibling?.classList.add("empty");
        textarea.previousElementSibling?.classList.add("empty")
      }
    } else {
      const fullmessage = `
    Hello Hussien Visuals,

   My name is ${this.name}.
   You can reach me at ${this.email} or ${this.phone}.

   Inquiry Type: ${this.inquiry}

   Message:
   ${this.message}
    `
      const url = `https://wa.me/81249957?text=${encodeURIComponent(fullmessage)}`
      window.open(url, '_blank');
    }

  }
}
