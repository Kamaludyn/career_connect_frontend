export const handleNotificationNavigation = (notification, navigate) => {
  if (notification.type === "mentorship_request") {
    // If its a mentorship request, navigate the mentor to the mentor request page
    navigate("/mentor-dashboard/requests", {
      state: { highlightId: `${notification.triggeredBy}` },
    });
  } else if (notification.type === "mentorship_accepted") {
    // if a mentorship request is accepted, navigate to the mentor's profile
    navigate(`/mentor-profile/${notification.triggeredBy}`);
  } else if (notification.type === "mentorship_rejected") {
    // if a mentorship request is rejected, navigate to the mentor's profile
    navigate("/mentorship");
  } else if (notification.type === "job_application") {
    // if its a job application notification, navigate to the job details page
    navigate(`/employer-dashboard/job-details/${notification.relatedId}`);
  } else if (
    notification.type === "new_job" ||
    notification.type === "application_update"
  ) {
    // if its a new job post notification or its a job application status update, navigate to the job details page
    navigate(`/job-details/${notification.relatedId}`);
  }
};
