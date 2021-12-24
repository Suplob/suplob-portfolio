import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, ThemeProvider } from "styled-components";
import FadeIn from "../PageTransitions/FadeAnimation";
import LogoComponent from "../subComponents/LogoComponent";
import ParticleComponent from "../subComponents/ParticleComponent";
import PowerButton from "../subComponents/PowerButton";
import SocialIcons from "../subComponents/SocialIcons";
import astronaut from "../assets/Images/spaceman.png";
import { DarkTheme } from "./Themes";
import emailjs from "emailjs-com";

const Contact = () => {
  const form = useRef();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setError(null);
      setSuccess(null);
    }, 5000);
  }, [success, error]);

  const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${(props) => props.theme.body};
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
  `;

  const float = keyframes`
0% { transform: translateY(-10px) }
50% { transform: translateY(15px) translateX(15px) }
100% { transform: translateY(-10px) }
`;

  const Spaceman = styled.div`
    position: absolute;
    top: 10%;
    right: 5%;
    width: 20vw;
    animation: ${float} 4s ease infinite;
    img {
      width: 100%;
      height: auto;
    }
  `;

  const Form = styled.form`
    background-color: black;
    width: 50%;
    display: flex;
    color: white;
    flex-direction: column;
    padding: 20px 50px;
  `;
  const Input = styled.input`
    border: 1px solid gray;
    padding: 8px 0;
    border-radius: 5px;

    &:focus {
      border: 1px solid black;
      outline: none;
    }
  `;
  const Label = styled.label`
    font-size: 24px;
    margin-top: 30px;
    margin-bottom: 10px;
  `;
  const TextArea = styled.textarea`
    height: 100px;
    border-radius: 5px;

    &:focus {
      border: 1px solid black;
      outline: none;
    }
  `;

  const SubmitInput = styled.input`
    padding: 8px 12px;
    border: 3px solid white;
    border-radius: 5px;
    background-color: inherit;
    color: white;
    width: 140px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    margin-top: 20px;
    cursor: pointer;
    transition: 150ms ease-in-out;

    &:hover {
      background-color: white;
      color: black;
    }
  `;

  const ConfirmationText = styled.p`
    color: ${(props) => props.color};
    font-size: 20px;
    margin-top: 10px;
    font-weight: 500;
  `;

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_peyqogj",
        "template_ynli6ml",
        form.current,
        "user_aGRvmVAfOtxniRbGiM7cc"
      )
      .then(
        (result) => {
          if (result.text) {
            setSuccess(true);
            e.target.reset();
          }
        },
        (error) => {
          if (error.text) {
            setError(true);
          }
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <FadeIn>
      <ThemeProvider theme={DarkTheme}>
        <LogoComponent theme="dark" />
        <SocialIcons theme="dark" />
        <PowerButton />
        <ParticleComponent theme="dark" />

        <Box>
          <h1 style={{ color: "white" }}>Contact Me</h1>
          <Spaceman>
            <img src={astronaut} alt="spaceman" />
          </Spaceman>
          <Form onSubmit={sendEmail} ref={form}>
            <Label for="name">Name</Label>
            <Input name="name" required></Input>

            <Label for="email">Email</Label>
            <Input name="email" required></Input>

            <Label for="message">Message</Label>
            <TextArea name="message" required></TextArea>

            <SubmitInput
              type="submit"
              value={loading === false ? "send message" : "sending!"}
            />
            {success && (
              <ConfirmationText color="green">
                Thank you for your message! I'll reply to your message ASAP
              </ConfirmationText>
            )}
            {error && (
              <ConfirmationText color="red">
                There has been an error sending message!
              </ConfirmationText>
            )}
          </Form>
        </Box>
      </ThemeProvider>
    </FadeIn>
  );
};

export default Contact;
