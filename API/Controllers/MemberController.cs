using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using API.DTOs;
using API.DTOs.Member;
using API.Interface;
using API.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [ApiController]
    [Route("api/member")]
    public class MemberController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly IEmailSender _emailSender;

        public MemberController(ApplicationDbContext context, IEmailSender emailSender)
        {
            _context = context;
            _emailSender = emailSender;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterMember([FromBody] MRegisterDTO mRegisterDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Check if the Plan exists
            var plan = await _context.Plans.FindAsync(mRegisterDTO.PlanId);
            if (plan == null)
            {
                return NotFound("The selected plan does not exist.");
            }


            var newMember = new MemberRegistration
            {
                Id = mRegisterDTO.Id,
                CardNo = mRegisterDTO.CardNo,
                MemberName = mRegisterDTO.MemberName,
                Contact = mRegisterDTO.Contact,
                EnrolledDate = mRegisterDTO.EnrolledDate,
                Price = mRegisterDTO.Price,
                ExpiryDate = mRegisterDTO.ExpiryDate,
                Email = mRegisterDTO.Email,
                PlanId = mRegisterDTO.PlanId,
                PlanName = mRegisterDTO.PlanName

            };


            try
            {
                await _context.MemberRegistrations.AddAsync(newMember);
                await _context.SaveChangesAsync();
                return Ok("The user is registered!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMembers(int pageNumber = 1, int pageSize = 8)
        {

            var allMember = _context.MemberRegistrations.OrderBy(m => m.MemberName);

            // Get the total count of members
            var totalRecords = await allMember.CountAsync();


            // Apply pagination with Skip and Take
            var members = await allMember
                                .Skip((pageNumber - 1) * pageSize) // Skip previous pages
                                .Take(pageSize) // Take only the required number of results
                                .ToListAsync();


            if (members == null)
            {
                return NotFound();
            }


            var sendMember = members.Select(member => new MRegisterDTO
            {

                Id = member.Id,
                CardNo = member.CardNo,
                MemberName = member.MemberName,
                Contact = member.Contact,
                EnrolledDate = member.EnrolledDate,
                Price = member.Price,
                ExpiryDate = member.ExpiryDate,
                Email = member.Email,
                PlanId = member.PlanId,
                PlanName = member.PlanName
            });

            // Return the members along with pagination metadata
            var paginationResult = new
            {
                TotalRecords = totalRecords,
                PageNumber = pageNumber,
                PageSize = pageSize,
                Members = sendMember
            };

            return Ok(paginationResult);
        }

        [HttpGet("getAllMembers")]
        public async Task<IActionResult> GetAllMemberss()
        {

            var allMember = _context.MemberRegistrations.OrderBy(m => m.MemberName);

            // Get the total count of members
            var totalRecords = await allMember.CountAsync();



            if (allMember == null)
            {
                return NotFound();
            }


            var sendMember = allMember.Select(member => new MRegisterDTO
            {

                Id = member.Id,
                CardNo = member.CardNo,
                MemberName = member.MemberName,
                Contact = member.Contact,
                EnrolledDate = member.EnrolledDate,
                Price = member.Price,
                ExpiryDate = member.ExpiryDate,
                Email = member.Email,
                PlanId = member.PlanId,
                PlanName = member.PlanName
            });



            return Ok(allMember);
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMember(int id, [FromBody] MRegisterDTO mRegisterDTO)
        {
            var memberToBeUpdated = await _context.MemberRegistrations.FindAsync(id);

            if (memberToBeUpdated == null)
            {
                return NotFound();
            }
            memberToBeUpdated.CardNo = mRegisterDTO.CardNo;
            memberToBeUpdated.MemberName = mRegisterDTO.MemberName;
            memberToBeUpdated.Contact = mRegisterDTO.Contact;
            memberToBeUpdated.EnrolledDate = mRegisterDTO.EnrolledDate;
            memberToBeUpdated.Price = mRegisterDTO.Price;
            memberToBeUpdated.ExpiryDate = mRegisterDTO.ExpiryDate;
            memberToBeUpdated.Email = mRegisterDTO.Email;
            memberToBeUpdated.PlanId = mRegisterDTO.PlanId;
            memberToBeUpdated.PlanName = mRegisterDTO.PlanName;

            _context.Entry(memberToBeUpdated).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(memberToBeUpdated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteMember([FromRoute] int id)
        {

            var memberToBeDeleted = await _context.MemberRegistrations.FindAsync(id);
            if (memberToBeDeleted == null)
            {
                return NotFound();
            }

            _context.MemberRegistrations.Remove(memberToBeDeleted);
            await _context.SaveChangesAsync();
            return StatusCode(200, "Member deleted Successfully!");

        }

        [HttpGet("email")]
        public async Task<IActionResult> SendEmail()
        {

            var recipientEmail = "suraj.kabirath@iic.edu.np";
            var subject = "Regarding Urget Meeting";
            var messageBody = "<p>Dear Sir,</p>" +
                       "<p>I hope this message finds you well. I need to pass on an important message to you. " +
                       "Additionally, a meeting is scheduled to be held at the Rara Lab. " +
                       "Please make sure to reach there as soon as possible. " +
                       "Your prompt attention to this matter would be greatly appreciated.</p>" +
                       "<p>Best regards.</p>" +
                       "<p>USSKD</p>";

            await _emailSender.SendEmailAsync(recipientEmail, subject, messageBody);
            return Ok("Message Sent");
        }


    }
}