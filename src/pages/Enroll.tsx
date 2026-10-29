
import { useState, type FormEvent } from "react";
import { Badge } from "../components/ui";

const sections = [
  "Welcome",
  "Personal Details",
  "Alumni Details",
  "Professional Details",
  "SCAA Participation",
  "Confirmation",
];

const initialValues = {
  fullName: "",
  phone: "",
  email: "",
  currentLocation: "",
  country: "",
  graduationYear: "",
  classRepresentative: "",
  classResponsibility: "",
  occupation: "",
  organisation: "",
  supportAreas: "",
  interests: [] as string[],
  willingToVolunteer: "",
  communicationChannel: "",
  otherChannel: "",
  consent: "",
  comments: "",
};

type AlumniFormValues = typeof initialValues;

const interestOptions = [
  "Networking and professional connections",
  "Mentorship and career development",
  "School development and student support",
  "Community development",
  "Events and reunions",
  "Fundraising and scholarships",
  "Sports and social activities",
  "Business and entrepreneurship",
];

export default function Enroll() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<AlumniFormValues>(initialValues);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const update = (name: keyof AlumniFormValues, value: string | string[]) => {
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const toggleInterest = (interest: string) => {
    const selected = values.interests.includes(interest)
      ? values.interests.filter((item) => item !== interest)
      : [...values.interests, interest];

    update("interests", selected);
  };

  const next = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    setStep((current) => Math.min(current + 1, sections.length - 1));
    setStatus("idle");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.consent) return;

    if (values.consent === "no") {
      setStatus("error");
      return;
    }

    const api = import.meta.env.VITE_API_URL as string | undefined;

    if (!api) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(`${api}/alumni/registration/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Registration failed");

      setStatus("success");
      setValues(initialValues);
      setStep(0);
    } catch {
      setStatus("error");
    }
  };

  const field = (
    name: keyof AlumniFormValues,
    label: string,
    placeholder: string,
    required = false,
    type = "text"
  ) => (
    <label className="en-field" key={name}>
      <span>
        {label} {required && <span className="en-required">*</span>}
      </span>
      <input
        className="en-input"
        name={name}
        type={type}
        value={values[name] as string}
        placeholder={placeholder}
        required={required}
        onChange={(event) => update(name, event.target.value)}
      />
    </label>
  );

  const radio = (
    name: "classRepresentative" | "willingToVolunteer" | "consent",
    label: string,
    options: { label: string; value: string }[]
  ) => (
    <fieldset className="en-choice">
      <legend>
        {label}
        {name === "consent" && <span className="en-required"> *</span>}
      </legend>
      <div className="en-choice__options">
        {options.map((option) => (
          <label className="en-radio" key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={values[name] === option.value}
              required={name === "consent"}
              onChange={(event) => update(name, event.target.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <>
      <section className="ab-head">
        <div className="ab-head__row">
          <div>
            <nav className="ab-crumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span aria-hidden="true">›</span>
              <span>Enroll as Alumni</span>
            </nav>
            <h1>Enroll as Alumni</h1>
          </div>
          <p className="quote-intro">
            Reconnect with your classmates, strengthen lifelong relationships,
            and help build a stronger Sony Complex Alumni Association.
          </p>
        </div>
      </section>

      <section className="en-banner">
        <div className="en-banner__inner">
          <Badge>SCAA Alumni Registration</Badge>
          {/* <h2 style={}>Once a Sony Complex student, always part of the family.</h2>
          <p>
            Reconnect. Collaborate. Make a difference.
          </p> */}
        </div>
      </section>

      <main className="container en-main">
        <div className="en-intro">
          <span className="en-eyebrow">WELCOME TO SCAA</span>
          <h2>Let’s reconnect and grow together.</h2>
          <p>
            This registration drive will help us build and maintain an
            up-to-date database of Sony Complex alumni, reconnect former
            students, and strengthen the bond that unites us as one community.
          </p>
          <p>
            Your information will help us understand alumni graduation years,
            professional backgrounds, areas of expertise, and interests. It
            will also help us create opportunities for networking, mentorship,
            collaboration, volunteering, and community development.
          </p>
          <p>
            Please provide accurate information and complete all applicable
            sections. Together, let us build a stronger Sony Complex Alumni
            Association!
          </p>
        </div>

        <section className="en-card">
          <div className="en-card__top">
            <div>
              <span className="en-eyebrow">ALUMNI REGISTRATION FORM</span>
              <h2>{sections[step]}</h2>
            </div>
            <span className="en-step-count">
              Step {step + 1} of {sections.length}
            </span>
          </div>

          <div
            className="en-progress"
            role="progressbar"
            aria-label="Registration progress"
            aria-valuemin={1}
            aria-valuemax={sections.length}
            aria-valuenow={step + 1}
          >
            <span style={{ width: `${((step + 1) / sections.length) * 100}%` }} />
          </div>

          <div className="en-step-list" aria-label="Form sections">
            {sections.map((section, index) => (
              <div
                key={section}
                className={`en-step ${index === step ? "is-active" : ""} ${
                  index < step ? "is-complete" : ""
                }`}
              >
                <span>{index < step ? "✓" : index + 1}</span>
                <small>{section}</small>
              </div>
            ))}
          </div>

          <form
            key={step}
            className="en-form"
            onSubmit={step === sections.length - 1 ? submit : next}
          >
            {step === 0 && (
              <div className="en-welcome">
                <div className="en-welcome__icon" aria-hidden="true">✦</div>
                <h3>Welcome, Sony Complex alumnus!</h3>
                <p>
                  Whether you graduated recently or many years ago, your story
                  is part of our shared history. This form gives you an
                  opportunity to reconnect, share your journey, and contribute
                  to the future of our alumni community.
                </p>
                <p>
                  The registration takes you through personal details, alumni
                  history, professional background, participation interests,
                  and confirmation.
                </p>
                <p className="en-privacy-note">
                  Please have your contact and graduation details ready before
                  you begin.
                </p>
              </div>
            )}

            {step === 1 && (
              <div className="en-fields">
                {field("fullName", "Full Name", "Enter your full name", true)}
                {field("phone", "Phone Number", "e.g. +254 712 345 678", true, "tel")}
                {field("email", "Email Address", "Enter your email address", true, "email")}
                {field("currentLocation", "Current Location", "Town or city", true)}
                {field("country", "Country", "e.g. Kenya, Canada", true)}
              </div>
            )}

            {step === 2 && (
              <div className="en-fields">
                <label className="en-field">
                  <span>Year of Graduation <span className="en-required">*</span></span>
                  <input
                    className="en-input"
                    name="graduationYear"
                    type="number"
                    min="1950"
                    max={new Date().getFullYear()}
                    placeholder="Enter your graduation year"
                    value={values.graduationYear}
                    required
                    onChange={(event) => update("graduationYear", event.target.value)}
                  />
                </label>

                {radio("classRepresentative", "Were you a class representative?", [
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ])}

                <label className="en-field en-field--full">
                  <span>Any other class responsibility, if any</span>
                  <textarea
                    className="en-input en-textarea"
                    name="classResponsibility"
                    placeholder="e.g. Class prefect, club leader, sports captain..."
                    value={values.classResponsibility}
                    onChange={(event) => update("classResponsibility", event.target.value)}
                  />
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="en-fields">
                {field("occupation", "Occupation / Profession", "What do you do?")}
                {field("organisation", "Organisation / Company", "Where do you work?")}

                <label className="en-field en-field--full">
                  <span>Areas where you can support SCAA</span>
                  <textarea
                    className="en-input en-textarea"
                    name="supportAreas"
                    placeholder="Share your skills, expertise, resources, or experience..."
                    value={values.supportAreas}
                    onChange={(event) => update("supportAreas", event.target.value)}
                  />
                </label>
              </div>
            )}

            {step === 4 && (
              <div className="en-fields">
                <fieldset className="en-choice en-field--full">
                  <legend>Areas of interest</legend>
                  <p className="en-help">Select all that apply.</p>
                  <div className="en-interest-grid">
                    {interestOptions.map((interest) => (
                      <label className="en-checkbox" key={interest}>
                        <input
                          type="checkbox"
                          checked={values.interests.includes(interest)}
                          onChange={() => toggleInterest(interest)}
                        />
                        <span>{interest}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {radio("willingToVolunteer", "Are you willing to volunteer?", [
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ])}

                <label className="en-field">
                  <span>Preferred communication channel</span>
                  <select
                    className="en-input"
                    name="communicationChannel"
                    value={values.communicationChannel}
                    onChange={(event) => update("communicationChannel", event.target.value)}
                  >
                    <option value="">Select a channel</option>
                    <option value="Email">Email</option>
                    <option value="Call">Call</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                {values.communicationChannel === "Other" &&
                  field("otherChannel", "Other communication channel", "Please specify")}
              </div>
            )}

            {step === 5 && (
              <div className="en-confirmation">
                <h3>Consent to Be Included in the SCAA Alumni Database</h3>
                <p>
                  I consent to having my personal and professional information
                  included in the Sony Complex Alumni Association (SCAA) alumni
                  database. I also agree to receive updates, announcements,
                  invitations, and other relevant communications regarding
                  SCAA activities, events, and initiatives.
                </p>
                <p>
                  I understand that my information will be used for alumni
                  engagement and association-related purposes.
                </p>

                {radio("consent", "Do you consent to the above?", [
                  { label: "Yes, I consent.", value: "yes" },
                  { label: "No, I do not consent.", value: "no" },
                ])}

                <label className="en-field en-field--full">
                  <span>Any additional comments</span>
                  <textarea
                    className="en-input en-textarea"
                    name="comments"
                    placeholder="Anything else you would like SCAA to know?"
                    value={values.comments}
                    onChange={(event) => update("comments", event.target.value)}
                  />
                </label>
                <p className="en-privacy-note">
                  Please review your details before submitting your registration.
                </p>
              </div>
            )}

            {status === "success" && (
              <p className="en-status en-status--success" role="status">
                Thank you for registering! Your details have been submitted successfully.
              </p>
            )}

            {status === "error" && (
              <p className="en-status en-status--error" role="alert">
                {values.consent === "no"
                  ? "You have not consented to inclusion in the alumni database. Your registration has not been submitted."
                  : "We could not submit your registration. Please try again later or contact the alumni team."}
              </p>
            )}

            <div className="en-actions">
              {step > 0 ? (
                <button
                  className="en-btn en-btn--back"
                  type="button"
                  onClick={() => {
                    setStep((current) => current - 1);
                    setStatus("idle");
                  }}
                >
                  Back
                </button>
              ) : (
                <a className="en-btn en-btn--back" href="/about">
                  About SCAA
                </a>
              )}

              <button
                className="en-btn en-btn--next"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending"
                  ? "Submitting..."
                  : step === sections.length - 1
                    ? "Submit Registration"
                    : "Continue"}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
