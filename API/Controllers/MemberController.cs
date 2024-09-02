using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [ApiController]
    [Route("api/member")]
    public class MemberController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public MemberController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterMember([FromBody] MemberRegistrationDto memberRegistrationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newMember = new MemberRegistration
            {
                FullName = memberRegistrationDto.FullName,
                ContactNumber = memberRegistrationDto.ContactNumber,
                RegistrationDate = memberRegistrationDto.RegistrationDate,
                Email = memberRegistrationDto.Email,

            };

            try
            {
                await _context.MemberRegistrations.AddAsync(newMember);
                await _context.SaveChangesAsync();
                return Ok(newMember);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMembers()
        {
            var allMembers = await _context.MemberRegistrations.ToListAsync();
            if (allMembers == null)
            {
                return NotFound();
            }

            var memberDto = allMembers.Select(member => new MemberRegistrationDto
            {
                Id = member.Id,
                FullName = member.FullName,
                ContactNumber = member.ContactNumber,
                RegistrationDate = member.RegistrationDate,
                Email = member.Email,
            });


            return Ok(allMembers);
        }
    }
}