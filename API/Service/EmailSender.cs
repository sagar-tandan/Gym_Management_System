using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interface;
using MailKit.Net.Smtp;
using MimeKit;



namespace API.Service
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _configuration;

        public EmailSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentException("Email address cannot be null or empty.", nameof(email));
            }

            try
            {
                var smtpSettings = _configuration.GetSection("SmtpSettings");

                var host = smtpSettings["Host"];
                var port = int.Parse(smtpSettings["Port"]);
                var username = smtpSettings["Username"];
                var password = smtpSettings["Password"];
                var enableSsl = bool.Parse(smtpSettings["EnableSsl"]);

                var emailMessage = new MimeMessage();
                emailMessage.From.Add(new MailboxAddress("Dharan Fitness Club", username));
                emailMessage.To.Add(new MailboxAddress("", email));
                emailMessage.Subject = subject;

                var bodyBuilder = new BodyBuilder { HtmlBody = htmlMessage };
                emailMessage.Body = bodyBuilder.ToMessageBody();

                using var client = new SmtpClient();

                await client.ConnectAsync(host, port, enableSsl ? MailKit.Security.SecureSocketOptions.StartTls : MailKit.Security.SecureSocketOptions.None);

                // Authenticate with your Gmail account
                await client.AuthenticateAsync(username, password);

                // Send the email
                await client.SendAsync(emailMessage);

                // Disconnect cleanly from the server
                await client.DisconnectAsync(true);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new InvalidOperationException("Error sending email.", ex);
            }
        }
    }
}
