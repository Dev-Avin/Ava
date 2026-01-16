import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { BirthdayCard } from "./BirthdayCard";
import { Balloon } from "./Balloon";
import { ConfettiEffect } from "./ConfettiEffect";
import { FloatingMemories } from "./FloatingMemories";
import { CuteAccordion } from "./CuteAccordion";
import { Calendar, Clock, PartyPopper } from "lucide-react";

export function BirthdayPage() {
  const birthdayPerson = {
    name: "Ava",
    birthMonth: 1, // January
    birthDay: 17,
    birthYear: 2004,
  };

  const [isBirthday, setIsBirthday] = useState(false);
  const [daysUntil, setDaysUntil] = useState(0);
  const [age, setAge] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const checkBirthday = () => {
      const today = new Date();
      const year = today.getFullYear();
      const birthdayThisYear = new Date(
        year,
        birthdayPerson.birthMonth - 1,
        birthdayPerson.birthDay
      );

      const isToday =
        today.getMonth() === birthdayThisYear.getMonth() &&
        today.getDate() === birthdayThisYear.getDate();
      setIsBirthday(isToday);

      let calculatedAge = year - birthdayPerson.birthYear;
      if (today < birthdayThisYear) calculatedAge -= 1;
      setAge(calculatedAge);

      let nextBirthday = birthdayThisYear;
      if (today > birthdayThisYear) {
        nextBirthday = new Date(
          year + 1,
          birthdayPerson.birthMonth - 1,
          birthdayPerson.birthDay
        );
      }
      const diffDays = Math.ceil(
        (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
      setDaysUntil(diffDays);
    };

    checkBirthday();
    const interval = setInterval(checkBirthday, 1000 * 60 * 60); // hourly
    return () => clearInterval(interval);
  }, []);

  const balloonColors = useMemo(
    () => ["#FF6B9D", "#FEC601", "#4ECDC4", "#C44569", "#F8B500", "#95E1D3"],
    []
  );

  const formattedBirthday = useMemo(
    () =>
      new Date(
        birthdayPerson.birthYear,
        birthdayPerson.birthMonth - 1,
        birthdayPerson.birthDay
      ).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      }),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 pt-16">
      
      {/* Background Memories */}
      {isBirthday ? <FloatingMemories /> : <FloatingMemories />}
      
      {/* Effects */}
      {isBirthday && (
        <>
          <ConfettiEffect />
          {balloonColors.slice(0, 5).map((color, i) => (
            <Balloon
              key={i}
              color={color}
              delay={i * 0.7}
              x={10 + (i * 80) / balloonColors.length}
            />
          ))}
        </>
      )}

      {!isBirthday &&
        balloonColors.slice(0, 3).map((color, i) => (
          <Balloon key={i} color={color} delay={i * 2} x={25 + i * 20} />
        ))}

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8">
        {isBirthday ? (
          <>
            <motion.div
              className="mb-8 flex items-center gap-3 rounded-full bg-white px-8 py-4 shadow-lg"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <PartyPopper className="text-pink-500" size={36} />
              <span className="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                IT’S THE BIG DAY!
              </span>
              <PartyPopper className="text-pink-500" size={36} />
            </motion.div>

            <BirthdayCard name={birthdayPerson.name} />

            {/* Accordion with delay for rhythm */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <CuteAccordion />
            </motion.div>

            <motion.div
              className="mt-8 rounded-2xl bg-white px-8 py-4 text-center shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <p className="text-2xl font-bold text-purple-600">
                My baby girl {birthdayPerson.name} turns {age} today 🎉
              </p>
            </motion.div>
          </>
        ) : (
          <motion.div
            className="max-w-2xl w-full rounded-3xl bg-white p-12 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          >
            <div className="text-center space-y-6">
              <Calendar className="mx-auto text-purple-500" size={64} />

              <h1 className="text-5xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
                Birthday Countdown
              </h1>

              <div className="rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 p-8">
                <p className="text-2xl text-gray-700">
                  {birthdayPerson.name}’s Birthday
                </p>

                <p className="text-4xl font-bold text-purple-600">
                  {formattedBirthday}
                </p>

                <div className="mt-6 flex items-center justify-center gap-4">
                  <Clock className="text-pink-500" size={32} />
                  <div>
                    <p className="text-6xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                      {daysUntil}
                    </p>
                    <p className="text-xl text-gray-600">
                      {daysUntil === 1 ? "day" : "days"} to go!
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-600">
                Turning <span className="font-semibold">{age + 1}</span> this
                year 🎂
              </p>

              <motion.p
                className="text-sm text-gray-500"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨ The celebration starts automatically on the big day ✨
              </motion.p>

              {/* Emotional line */}
              <motion.p
                className="mt-4 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Counting down to another beautiful memory 💫
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Footer date */}
        <motion.div
          className="mt-8 rounded-full bg-white/60 px-6 py-3 text-sm text-gray-600 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Today:{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </motion.div>
      </div>
    </div>
  );
}
