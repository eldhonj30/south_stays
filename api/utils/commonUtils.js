import otpGenerator from "otp-generator";

export async function getOtp() {
  let otp = {};
  otp.otpValue = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  otp.otpTimestamp = new Date().getTime();

  return otp;
}

export function getMsg(otp) {
    const message = {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com", // list of receivers
      subject: "Verification mail", // Subject line
      text: `your otp is ${otp}`, // plain text body
    };

    return message;
}
