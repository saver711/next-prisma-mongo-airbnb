"use client"
import { useState } from "react"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import { shallow } from "zustand/shallow"
import { Modal } from "./modal"
import { Heading } from "../heading"
import { toast } from "react-hot-toast"
import { Input } from "../inputs/input"
import { Button } from "../button"
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai"
import { useLoginModal } from "@/app/hooks/use-login-modal"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useRegisterModal } from "@/app/hooks/use-register-modal"

export const LoginModal = () => {
  const router = useRouter()
  const {
    onClose,
    onOpen,
    isOpen: isModalOpen,
  } = useLoginModal(
    (state) => ({
      onClose: state.onClose,
      onOpen: state.onOpen,
      isOpen: state.isOpen,
    }),
    shallow
  )
  const {
    onOpen: registerModalOnOpen,
  } = useRegisterModal(
    (state) => ({
      onClose: state.onClose,
      onOpen: state.onOpen,
      isOpen: state.isOpen,
    }),
    shallow
  )

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn("credentials", {
      ...data,
      // by default when there are an error, next-auth redirects to an error page, with redirect false it will not redirect and will always enter .then so i need to handle errors there
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          toast.error(`Something went wrong: ${res?.error}`)
          return
        }
        router.refresh()
        toast.success(`Logged in successfully`)
        onClose()
      })
      .catch((err) => {
        console.log(`LoginModal ~ err:`, err)
        toast.error("Something went wrong.")
      })
      .finally(() => setIsLoading(false))
  }

  const onToggle = ()=>{
    onClose()
    registerModalOnOpen()
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back to Airbnb!"
        subtitle="Login to your account"
      />
      <Input
        errors={errors}
        id="email"
        type="email"
        label="Email"
        disabled={isLoading}
        register={register}
        required
      />
      <Input
        errors={errors}
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          Does not have an account?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Sign up
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={isModalOpen}
      title="Login"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
