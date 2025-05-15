import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faEnvelope,
  faComments,
  faBook,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

function Help() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 text-center md:text-start">
      <div className="mb-8">
        <div className=" gap-3 mb-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Help Center
          </h1>
        </div>
        <p className="text-gray-600 ">
          Find answers to common questions or contact our support team
        </p>
      </div>
      <div className="text-sm mt-5 mb-2 text-gray-400 text-center ">
        Scroll down to see more
      </div>
      <div className="overflow-y-auto h-[550px] hide-scrollbar md:ms-3">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
              <FontAwesomeIcon icon={faBook} className="text-emerald-500" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <div className="border-b pb-3">
                <h3 className="font-medium text-gray-800">
                  How do I set up a new reminder?
                </h3>
                <p className="text-gray-600 mt-1 text-sm">
                  Go to the Schedule tab, fill in the details, and click "Set
                  Reminder".
                </p>
              </div>
              <div className="border-b pb-3">
                <h3 className="font-medium text-gray-800">
                  Can I change notification preferences?
                </h3>
                <p className="text-gray-600 mt-1 text-sm">
                  Yes, you can manage notifications in your Account Settings.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  Why am I not receiving reminders?
                </h3>
                <p className="text-gray-600 mt-1 text-sm">
                  Check your notification settings and ensure you've enabled at
                  least one notification method.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
              <FontAwesomeIcon icon={faComments} className="text-emerald-500" />
              Contact Support
            </h2>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-emerald-500"
                />
                <div>
                  <h3 className="font-medium text-gray-800">Email Us</h3>
                  <p className="text-gray-600 text-sm">
                    support@reminderapp.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <FontAwesomeIcon icon={faPhone} className="text-emerald-500" />
                <div>
                  <h3 className="font-medium text-gray-800">Call Us</h3>
                  <p className="text-gray-600 text-sm">+1 (800) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
              <FontAwesomeIcon icon={faBook} className="text-emerald-500" />
              Helpful Resources
            </h2>

            <div className="space-y-3">
              <button className="w-full text-left py-2 px-3 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                User Guide (PDF)
              </button>
              <button className="w-full text-left py-2 px-3 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                Video Tutorials
              </button>
              <button className="w-full text-left py-2 px-3 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                Community Forum
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
