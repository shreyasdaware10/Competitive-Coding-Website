import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background: linear-gradient(135deg, #6dd5ed, #2193b0);
`;

const Message = styled(motion.div)`
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin-bottom: 20px;
  max-width: 500px;
  position: relative;
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  color: #4caf50;
  margin-bottom: 20px;
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #4caf50;
  background: linear-gradient(45deg, #f3ec78, #af4261);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradient} 5s ease infinite;
`;

const Text = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const Button = styled(motion.button)`
  background: linear-gradient(45deg, #f093fb, #f5576c);
  border: none;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px 30px;
  transition: background-color 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #f5576c, #f093fb);
  }
`;

export default function SuccessPage() {
  return (
    <Container>
      <Message
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <IconWrapper>
          <FaCheckCircle />
        </IconWrapper>
        <Title>Submission Successful!</Title>
        <Text>
          Thank you for your submission. We have received your submission!
        </Text>
        <Link href='/'>
          <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Go Back
          </Button>
        </Link>
      </Message>
    </Container>
  );
}
