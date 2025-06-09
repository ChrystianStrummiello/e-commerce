export const Footer = () => {
  return (
    <div className="flex flex-col items-center w-full p-4 border-t border-t-muted">
      <p className="text-sm leading-6 text-muted-foreground">
        &copy; {new Date().getFullYear()} Your Company, Inc. All rights
        reserved.
      </p>
    </div>
  );
};
