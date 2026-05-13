import { useId, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { profile, activeSocialEntries } from '../data/profile'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import SectionHeading from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import Eyebrow from '../components/ui/Eyebrow'
import { easeSmooth } from '../motion/presets'

const SUBMIT_MS = 520

const initialForm = { name: '', email: '', message: '' }

function validate(form) {
  const errors = {}
  const name = form.name.trim()
  const email = form.email.trim()
  const message = form.message.trim()
  if (!name) errors.name = 'Please enter your name.'
  if (!email) errors.email = 'Please enter a valid email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Use an address like name@domain.com.'
  if (!message) errors.message = 'Please add a short message.'
  return errors
}

export default function Contact() {
  const reduce = useReducedMotion()
  const socialLinks = activeSocialEntries()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const statusRef = useRef(null)
  const formId = useId()
  const hintName = `${formId}-hint-name`
  const hintEmail = `${formId}-hint-email`
  const hintMessage = `${formId}-hint-message`

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((ePrev) => ({ ...ePrev, [name]: undefined }))
    if (submitted) setSubmitted(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (isSubmitting) return
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false)
      return
    }
    setIsSubmitting(true)
    setSubmitted(false)
    window.setTimeout(() => {
      setForm(initialForm)
      setErrors({})
      setSubmitted(true)
      setIsSubmitting(false)
      requestAnimationFrame(() => {
        statusRef.current?.focus()
      })
    }, SUBMIT_MS)
  }

  return (
    <PageTransition>
      <Container className="pt-12 sm:pt-16">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s build something refined"
            subtitle={
              socialLinks.length
                ? 'This form is a UI demo (it won’t send yet). For now, email is best—or reach out via the links below.'
                : 'This form is a UI demo (it won’t send yet). For now, email is the best way to reach me.'
            }
          />
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <Card className="lg:col-span-7 p-6 sm:p-10">
            <div aria-live="polite" className="min-h-[1.25rem]">
              {submitted ? (
                <motion.div
                  ref={statusRef}
                  id={`${formId}-form-status`}
                  tabIndex={-1}
                  role="status"
                  className="mb-4 rounded-2xl border border-accent-500/25 bg-accent-500/10 px-4 py-3 text-sm text-obsidian-950/85 outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-linen-50"
                  initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, ease: easeSmooth }}
                >
                  Message recorded (demo only). In production this would send securely—use email below for now.
                </motion.div>
              ) : null}
            </div>

            <form className="space-y-4" onSubmit={onSubmit} noValidate>
              <label htmlFor={`${formId}-name`} className="block">
                <span className="text-sm font-semibold text-obsidian-950/75">Name</span>
                <input
                  id={`${formId}-name`}
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your name"
                  className="input-field mt-2"
                  autoComplete="name"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={`${hintName}${errors.name ? ` ${formId}-err-name` : ''}`}
                />
                <span id={hintName} className="mt-1 block text-xs text-obsidian-950/50">
                  How you’d like to be addressed.
                </span>
                {errors.name ? (
                  <span id={`${formId}-err-name`} className="mt-1 block text-sm text-red-700/90" role="alert">
                    {errors.name}
                  </span>
                ) : null}
              </label>

              <label htmlFor={`${formId}-email`} className="block">
                <span className="text-sm font-semibold text-obsidian-950/75">Email</span>
                <input
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="you@domain.com"
                  className="input-field mt-2"
                  autoComplete="email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={`${hintEmail}${errors.email ? ` ${formId}-err-email` : ''}`}
                />
                <span id={hintEmail} className="mt-1 block text-xs text-obsidian-950/50">
                  I’ll only use this to reply.
                </span>
                {errors.email ? (
                  <span id={`${formId}-err-email`} className="mt-1 block text-sm text-red-700/90" role="alert">
                    {errors.email}
                  </span>
                ) : null}
              </label>

              <label htmlFor={`${formId}-message`} className="block">
                <span className="text-sm font-semibold text-obsidian-950/75">Message</span>
                <textarea
                  id={`${formId}-message`}
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="A quick note about your project…"
                  rows={6}
                  className="input-field mt-2"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={`${hintMessage}${errors.message ? ` ${formId}-err-message` : ''}`}
                />
                <span id={hintMessage} className="mt-1 block text-xs text-obsidian-950/50">
                  Timeline, scope, or links help a lot.
                </span>
                {errors.message ? (
                  <span id={`${formId}-err-message`} className="mt-1 block text-sm text-red-700/90" role="alert">
                    {errors.message}
                  </span>
                ) : null}
              </label>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting} ariaBusy={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Send message'}
                </Button>
                <Button href={`mailto:${profile.email}`} variant="ghost" className="w-full sm:w-auto">
                  Email instead
                </Button>
              </div>
            </form>
          </Card>

          <Card className="lg:col-span-5 p-6 sm:p-10">
            <Eyebrow>Direct</Eyebrow>
            <div className="mt-4 text-xl font-semibold tracking-tight text-obsidian-950">Reach me here</div>
            <div className="mt-6 flex flex-col gap-3">
              <Button href={`mailto:${profile.email}`} variant="ghost" className="justify-start">
                {profile.email}
              </Button>
              {socialLinks.map(([k, url]) => (
                <Button key={k} href={url} target="_blank" variant="ghost" className="justify-start">
                  {k}
                </Button>
              ))}
            </div>

            <div className="mt-10 rounded-3xl border border-semantic-borderHairline bg-gradient-to-br from-white/70 to-transparent p-6">
              <Eyebrow>Notes</Eyebrow>
              <p className="mt-3 text-sm leading-relaxed text-semantic-body">
                If you share a link to your work and your goal for the site, I’ll tailor the copy and
                case-study structure so it feels specific, not generic.
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </PageTransition>
  )
}
